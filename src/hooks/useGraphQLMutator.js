import { useMutation } from "@apollo/client";
import { useState } from "react";
import { showToastData } from "../utils/helpers";



export default function useGraphQLMutator(query, queryName, refetchQueries, onMutated = () => null, title = null, onSuccessOccured = () => null, top = false) {

    const [visible, setVisible] = useState(false);
    const [submiting, setSubmitting] = useState(false);
    const [editing, setEditing] = useState(false);
    const [uuid, setUuid] = useState(null);

    const [mutation] = useMutation(query, {
        onCompleted: (data) => {
            if (data[queryName].code === 9000) {
                setVisible(false);
                onSuccessOccured()
            }

            setSubmitting(false);
            if (title) {
                showToastData(data[queryName], title, top);
            } else {
                showToastData(data[queryName]);
            }
            onMutated();
        },
        refetchQueries: refetchQueries
    });

    const stopLoading = () => {
        setSubmitting(false);
    }

    return {
        mutation,
        visible,
        submiting,
        setVisible,
        setSubmitting,
        setEditing,
        editing,
        uuid,
        setUuid,
        stopLoading,

    }

}