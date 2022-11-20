import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { join } from "path";
import { Certificate, CertificateValidation, ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { AaaaRecord, ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

export interface ISpaWebsite {
    /**
     * Bucket that contains the content of your SPA
     */
    readonly spaOriginBucket: s3.IBucket;
    /** 
     * Implement security best practices for header policy
     */
    readonly spaDistribution: cloudfront.IDistribution;
    /**
     * Certificate assigned to spaDistribution
     */
    readonly spaCertificate: ICertificate;
    /**
     * WWW domain name for SPA website
     * @example www.example.com
     */
    readonly wwwDomainName: string;
    /**
     * Domain name for SPA website
     * @example example.com
     */
    readonly domainName: string;
}

export interface SpaWebsiteProps {
    /**
     * Domain Name for SPA Distrbution
     */
    readonly distributionDomainName: string,
    /**
     * Route 53 zone name to add DNS records for distribution domain name
     */
    readonly route53ZoneName: string,
}

export class SpaWebsite extends Construct implements ISpaWebsite {
    readonly spaOriginBucket: s3.IBucket;

    readonly spaDistribution: cloudfront.IDistribution;

    readonly spaCertificate: ICertificate;

    readonly wwwDomainName: string;

    readonly domainName: string;

    /**
     * Route53 Zone name can contain . at the end of the name.
     * normalizedRoute53ZoneName will not have dot at the end
     */
    private readonly normalizedRoute53ZoneName: string;

    /**
     * Best security practices for CloudFront Response Security Header
     */
    static readonly defaultResponseHeadersPolicy: cloudfront.ResponseSecurityHeadersBehavior = {
        frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
        },
        referrerPolicy: {
            referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
            override: true,
        },
        strictTransportSecurity: {
            accessControlMaxAge: Duration.seconds(31536000),
            includeSubdomains: true,
            preload: true,
            override: true,
        },
        xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
        },
        contentTypeOptions: {
            override: true,
        }
    };

    constructor(scope: Construct, id: string, props: SpaWebsiteProps) {
        super(scope, id);

        this.normalizedRoute53ZoneName = props.route53ZoneName;
        if (this.normalizedRoute53ZoneName.endsWith("."))
            this.normalizedRoute53ZoneName = props.route53ZoneName.substring(0, this.normalizedRoute53ZoneName.length - 1);

        if (!props.distributionDomainName.endsWith(this.normalizedRoute53ZoneName))
            throw new Error(`DNS zone ${props.route53ZoneName} is not authoritative for certificate domain name ${props.distributionDomainName}`);

        if (this.normalizedRoute53ZoneName.startsWith("www.") || props.distributionDomainName.startsWith("www."))
            throw new Error(`Zone name ${props.route53ZoneName} cannot start with www.`)

        if (Stack.of(this).region !== "us-east-1")
            throw new Error(`SpaWebsite Construct ${id} will create an ACM Certificate for CloudFront Distribution.
             CloudFront Certificate must be created at us-east-1 only.`);

        this.wwwDomainName = `www.${props.distributionDomainName}`;
        this.domainName = props.distributionDomainName;

        const spaOriginBucket = new s3.Bucket(this, 'OriginBucket', {
            publicReadAccess: false,
            objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
        });
        this.spaOriginBucket = spaOriginBucket;

        const viewerRequestFunction = new cloudfront.Function(this, "ViewerRequestFunction", {
            code: cloudfront.FunctionCode.fromFile({
                filePath: join(__dirname, "viewer-request.ts")
            }),
            comment: "A Function to redirect from WWW to non WWW in Viewer Request",
        });

        const spaResponseHeader = new cloudfront.ResponseHeadersPolicy(this, 'ResponseHeaderPolicy', {
            securityHeadersBehavior: SpaWebsite.defaultResponseHeadersPolicy,
        });

        const zone = HostedZone.fromLookup(this, "HostedZone", {
            domainName: this.normalizedRoute53ZoneName,
        });

        this.spaCertificate = new Certificate(this, "SpaCertificate", {
            domainName: this.domainName,
            subjectAlternativeNames: [this.wwwDomainName],
            validation: CertificateValidation.fromDns(zone),
        });

        const spaDistribution = new cloudfront.Distribution(this, 'Distribution', {
            defaultBehavior: {
                origin: new S3Origin(spaOriginBucket),
                allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
                responseHeadersPolicy: spaResponseHeader,
                smoothStreaming: false,
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
                compress: true,
                functionAssociations: [{
                    eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
                    function: viewerRequestFunction,
                }],
                cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
            },
            domainNames: [this.domainName, this.wwwDomainName],
            certificate: this.spaCertificate,
            priceClass: cloudfront.PriceClass.PRICE_CLASS_100, //Distrubute to USA, Canada, Europe, & Israel only
            defaultRootObject: "index.html",
            minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            enableIpv6: true,
            // In case if user requests non-existing path so that we can redirect to appropriate page
            errorResponses: [404, 403].map(httpStatus => ({
                httpStatus,
                responseHttpStatus: 200,
                responsePagePath: '/index.html',
            })),
            comment: `Spa Distribution for ${id}`
        });
        this.spaDistribution = spaDistribution;

        [this.domainName, this.wwwDomainName].forEach(domain => {
            // Adding DNS Records for Distribution
            new ARecord(this, `${domain}ARecord`, {
                zone,
                target: RecordTarget.fromAlias(new CloudFrontTarget(this.spaDistribution)),
                comment: "Created by SpaWebsite Construct - AWS CDK",
                recordName: domain,
            });

            // For IPV6
            new AaaaRecord(this, `${domain}AaaaRecord`, {
                zone,
                target: RecordTarget.fromAlias(new CloudFrontTarget(this.spaDistribution)),
                comment: "Created by SpaWebsite Construct - AWS CDK",
                recordName: domain,
            });
        });
    }

}