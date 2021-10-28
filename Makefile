stackName := example

ifeq ($(target), )
	@echo "you must add argument target"
	@exit 1
endif

# check arguments correctly
# make test target="test"
test:
	echo "target is $(target)"
	echo "stackName is $(stackName)"

deploy:
	aws cloudformation deploy \
		--stack-name $(stackName)-$(target) \
		--template-file $(target).yaml \
		--parameter-overrides \
		file://parameters/$(target).json \
		--capabilities CAPABILITY_NAMED_IAM

validate:
	aws cloudformation validate-template \
		--template-body file://$(target).yaml
