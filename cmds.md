export PATH=$PATH:$HOME/go/bin
  
protoc --go-grpc_out=. dozer/generated/mutual_funds/mutual_funds.proto -I dozer/generated/mutual_funds -I dozer/types  --go_out=. 
protoc --go-grpc_out=. dozer/generated/recent_transactions/recent_transaction.proto -I dozer/generated/recent_transactions -I dozer/types  --go_out=. 

go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

docker-compose rm -f 