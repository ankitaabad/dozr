export PATH=$PATH:$HOME/go/bin
  
protoc --go-grpc_out=. dozer/generated/mutual_funds/mutual_funds.proto -I dozer/generated/mutual_funds -I dozer/types  --go_out=. 
protoc --go-grpc_out=. dozer/generated/recent_transactions/recent_transaction.proto -I dozer/generated/recent_transactions -I dozer/types  --go_out=. 

go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

docker-compose rm -f 

export DOCKER_BUILDKIT=0

rm  ~/.docker/config.json 

atlas schema inspect -u "postgresql://0.0.0.0:5432/postgres?sslmode=disable" > schema.hcl 

atlas schema apply -u "postgresql://0.0.0.0:5433/postgres?sslmode=disable" --to schema.hcl  

atlas migrate diff create_users \
  --dir "file://migrations" \
  --to "file://schema.hcl" \
  --dev-url "postgresql://0.0.0.0:5432/postgres?sslmode=disable" \

atlas migrate apply --dir file://migrations --url postgresql://0.0.0.0:5432/postgres?sslmode=disable --baseline 20221114165732

atlas migrate status --dir file://migrations --url "postgresql://0.0.0.0:5432/postgres?sslmode=disable"

