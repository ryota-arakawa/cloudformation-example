deploy:
	aws cloudformation deploy --template-file vpc.yaml \
		--stack-name main-vpc \
		--parameter-overrides \
		file://parameter.json \
		--capabilities CAPABILITY_NAMED_IAM
