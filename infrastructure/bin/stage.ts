import { Stack, Stage, StageProps } from "aws-cdk-lib";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { BucketDeployment, Source, StorageClass } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { join } from "path";
import { SpaWebsite } from "../lib/constructs/spa-website";

export class FrontEndStage extends Stage {
    constructor(scope: Construct, id: string, stageProps: StageProps) {
        super(scope, id, stageProps);

        const frontendStack = new Stack(this, 'FrontEnd', {
            env: stageProps.env,
        });

        const spaWebsite = new SpaWebsite(frontendStack, "SpaWebsite", {
            distributionDomainName: "matched.themagehub.com",
            route53ZoneName: "themagehub.com",
        });

        new BucketDeployment(frontendStack, 'S3Deployment', {
            sources: [Source.asset(join(__dirname, "..", "..", "build"))],
            destinationBucket: spaWebsite.spaOriginBucket,
            storageClass: StorageClass.STANDARD,
            logRetention: RetentionDays.ONE_DAY,
            distribution: spaWebsite.spaDistribution,
        });
    }
}