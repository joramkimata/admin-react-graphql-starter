import { createContext, useMemo, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { PropagateLoader } from "react-spinners";

export const GraphQLOperationLoaderContext = createContext({
    setLoading: () => { }
});

const GraphQLOperationLoader = ({ children, color = '#434670' }) => {
    const [loading, setLoading] = useState(false);

    const overlayValue = useMemo(() => {
        return { setLoading }
    }, [setLoading]);


    return (
        <GraphQLOperationLoaderContext.Provider value={overlayValue}>
            <LoadingOverlay active={loading} spinner={<PropagateLoader color={color} />} styles={{
                overlay: (base) => ({
                    ...base,
                    background: 'rgba(0, 0, 0, 0.15)'
                })
            }}>
                {children}
            </LoadingOverlay>
        </GraphQLOperationLoaderContext.Provider>
    )

}

export default GraphQLOperationLoader;