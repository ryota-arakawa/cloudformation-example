stackName := example

ifeq ($(target), )
	@echo "you must add argument target"
	@exit 1
endif

# スタックを固定するためstackNameはMakefileで定義された物でなければならない
ifneq ($(stackName), example)
	@echo "stackName must be defined variable in Makefile"
	@exit 1
endif

# check arguments correctly
# make test target="test"
test:
	echo "target is $(target)"
	echo "stackName is $(stackName)"

# stackNameの引数はMakefile内に定義してあるので不要
# make deploy target="$(target)"
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
