.PHONY: test
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