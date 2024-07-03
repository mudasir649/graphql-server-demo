import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas.js";
import db from "./_db.js";

const resolvers = {
    Query: {
        games(){
            return db.games
        },
        game(_, args){
            return db.games.find((game) => game.id === args.id)
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id)
        },
        review(_, args){
            console.log(args);
            return db.reviews.find((review) => review.id === args.id)
        }
    }
}

// server-setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000}
});

console.log('Server ready at port: ', 4000);
