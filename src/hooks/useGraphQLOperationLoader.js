import { useContext } from "react"
import { GraphQLOperationLoaderContext } from "../components/loaders/GraphQLOperationLoader"


export default function useGraphQLOperationLoader() {
    const { setLoading } = useContext(GraphQLOperationLoaderContext);
    return setLoading;
}