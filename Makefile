.PHONY: test e2e dist
build:
	docker compose build

start:
	docker compose up

stop:
	docker compose stop

test:
	docker-compose exec kanbang-app npm run test $(ARGS)

lint:
	docker-compose exec kanbang-app npm run lint

fix:
	docker-compose exec kanbang-app npm run lint-fix

e2e:
	docker compose run kanbang-e2e npm run test

dist:
	docker-compose exec kanbang-app npm run build
