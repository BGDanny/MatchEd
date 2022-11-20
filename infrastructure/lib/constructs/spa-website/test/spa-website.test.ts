import { App, Stack } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { SpaWebsite } from "../spa-website";

describe("Spa Website Test", () => {
    let app: App;
    let stack: Stack;

    beforeEach(() => {
        app = new App();
        stack = new Stack(app, 'Stack', {
            env: {
                account: "123456789",
                region: "us-east-1"
            }
        })
    });

    test('Stack of SpaWebsite must be at us-east-1', () => {
        const app = new App();
        const stack = new Stack(app, "Stack", {
            env: {
                region: "us-east-2",
            }
        });

        expect(() => new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        })).toThrowError(`SpaWebsite Construct SpaWebsite will create an ACM Certificate for CloudFront Distribution.
             CloudFront Certificate must be created at us-east-1 only.`);
    });

    test("Spa Website Construct can be created in us-east-1", () => {
        expect(() => new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        })).not.toThrow();

    });

    it.each([
        ["www.example.com", "www.example.com"],
        ["hello.www.example2.com", "www.example2.com"],
    ])("Case %#: Domain name starts with www not allowed %p", (distributionDomainName, route53ZoneName) => {
        expect(() => new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName,
            route53ZoneName,
        })).toThrowError(`Zone name ${route53ZoneName} cannot start with www.`);
    });


    test("Correct domain name and wwwDomain Name created", () => {
        const spaWebsite = new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        });
        expect(spaWebsite.domainName).toEqual("example.com");
        expect(spaWebsite.wwwDomainName).toEqual("www.example.com");

        const template = Template.fromStack(stack);

        template.hasResourceProperties("AWS::CloudFront::Distribution", {
            DistributionConfig: {
                Aliases: [
                    "example.com",
                    "www.example.com"
                ],
            }
        });
    });

    test("Redirection is setup for SPA Website", () => {
        new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        });

        const template = Template.fromStack(stack);

        template.hasResourceProperties("AWS::CloudFront::Distribution", {
            DistributionConfig: {
                CustomErrorResponses: [
                    {
                        ErrorCode: 404,
                        ResponseCode: 200,
                        ResponsePagePath: "/index.html"
                    },
                    {
                        ErrorCode: 403,
                        ResponseCode: 200,
                        ResponsePagePath: "/index.html"
                    }]
            }
        });
    });

    it.each([
        ["example.com", "example.com"],
        ["test.hello.com", "hello.com"]
    ])
        ("Case %#: Correct amount of Record Set are created, given that CloudFront Distribution IPV6 is enabled",
            (distributionDomainName, route53ZoneName) => {
                new SpaWebsite(stack, "SpaWebsite", {
                    distributionDomainName,
                    route53ZoneName,
                });
                const template = Template.fromStack(stack);
                template.resourceCountIs("AWS::Route53::RecordSet", 4);

                const commonTarget = {
                    AliasTarget: {
                        DNSName: {
                            "Fn::GetAtt": [
                                "SpaWebsiteDistribution77CA1AB6",
                                "DomainName"
                            ]
                        },
                    }
                }

                // IPV6 must be enabled so that we can create AAAA record
                const results = template.findResources("AWS::CloudFront::Distribution");
                const ipv6Enabled = results.SpaWebsiteDistribution77CA1AB6.Properties
                    .DistributionConfig.IPV6Enabled;
                expect(ipv6Enabled).toEqual(true);

                template.hasResourceProperties("AWS::Route53::RecordSet", {
                    Name: `${distributionDomainName}.`,
                    Type: "AAAA",
                    AliasTarget: commonTarget.AliasTarget,
                });


                template.hasResourceProperties("AWS::Route53::RecordSet", {
                    Name: `www.${distributionDomainName}.`,
                    Type: "AAAA",
                    AliasTarget: commonTarget.AliasTarget,
                });

                template.hasResourceProperties("AWS::Route53::RecordSet", {
                    Name: `${distributionDomainName}.`,
                    Type: "A",
                    AliasTarget: commonTarget.AliasTarget,
                });

                template.hasResourceProperties("AWS::Route53::RecordSet", {
                    Name: `www.${distributionDomainName}.`,
                    Type: "A",
                    AliasTarget: commonTarget.AliasTarget,
                });
            })

    test("Route53 Zone must be distributionDomainName authoritative domain", () => {
        expect(() => new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "hello.com",
        })).toThrowError(`DNS zone hello.com is not authoritative for certificate domain name example.com`);
    });


    test("S3 Bucket has correct policy", () => {
        new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        });

        const template = Template.fromStack(stack);

        template.resourceCountIs("AWS::S3::Bucket", 1);

        template.hasResourceProperties("AWS::S3::Bucket", {
            "PublicAccessBlockConfiguration": {
                "BlockPublicAcls": true,
                "BlockPublicPolicy": true,
                "IgnorePublicAcls": true,
                "RestrictPublicBuckets": true
            },
        })
    });


    test("CloudFront Function for redirecting WWW website is created", () => {
        new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        });

        const template = Template.fromStack(stack);

        template.resourceCountIs("AWS::CloudFront::Function", 1);

        template.hasResourceProperties("AWS::CloudFront::Distribution", {
            DistributionConfig: {
                DefaultCacheBehavior: {
                    FunctionAssociations: [
                        {
                            EventType: "viewer-request",
                            FunctionARN: Match.anyValue(),
                        }
                    ],
                }
            }
        });
    })

    test("CloudFront OAI is created for CloudFront Distribution", () => {
        new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        });

        const template = Template.fromStack(stack);

        template.resourceCountIs("AWS::CloudFront::CloudFrontOriginAccessIdentity", 1);

        template.hasResourceProperties("AWS::CloudFront::Distribution", {
            DistributionConfig: {
                "Origins": [
                    {
                        "DomainName": {
                            "Fn::GetAtt": [
                                "SpaWebsiteOriginBucket77DF0960",
                                "RegionalDomainName"
                            ]
                        },
                        "Id": "StackSpaWebsiteDistributionOrigin1B3A7FA1E",
                        "S3OriginConfig": {
                            "OriginAccessIdentity": {
                                "Fn::Join": [
                                    "",
                                    [
                                        "origin-access-identity/cloudfront/",
                                        {
                                            "Ref": "SpaWebsiteDistributionOrigin1S3Origin876A4AE7"
                                        }
                                    ]
                                ]
                            }
                        }
                    }]
            }
        });
    })


    test("ACM Certificate and CloudFront Distribution domain names must match", () => {
        new SpaWebsite(stack, "SpaWebsite", {
            distributionDomainName: "example.com",
            route53ZoneName: "example.com",
        });

        const template = Template.fromStack(stack);

        template.hasResourceProperties("AWS::CloudFront::Distribution", {
            "DistributionConfig": {
                "Aliases": [
                    "example.com",
                    "www.example.com"
                ],
            }
        });

        template.hasResourceProperties("AWS::CertificateManager::Certificate", {
            "DomainName": "example.com",
            "SubjectAlternativeNames": [
                "www.example.com"
            ],
        });
    })
})