import { useEffect, useState } from "react"
import { deleteCollegeById, loadColleges } from "../../api/college-api/CollegeAPI.js";


export const useCollegesRetriver = (actions) => {
    //console.log(`useCollegesRetriver Actions: ${JSON.stringify(actions)}`);
    const [collegesData, setCollegesData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadColleges({}, result => {
            //console.log(`result: ${JSON.stringify(result)}`);
            if (result.networkError || result.graphQLErrors) {
                setCollegesData({error: result});
                //setError(result);
            } else {
                //console.log(`CollegeManagerHook: ${JSON.stringify(result)}`);
                setCollegesData(result);
            }
        });
    }, []);

    return {
        collegesData
    };
};

export const useDeleteCollege = (id) => {
    const [deleteResponse, setDeleteResponse] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        deleteCollegeById(id, result => {
            if (result.networkError || result.graphQLErrors) {
                setError(result);
            } else {
                setDeleteResponse(result);
            }
        });
    }, []);

    return [deleteResponse, error];
};