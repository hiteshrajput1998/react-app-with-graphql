import { useEffect, useState } from "react"
import { removeCollegeById, removeCollegeByIds, loadColleges } from "../../api/college-api/CollegeAPI.js";


export const useCollegeHooks = (actions) => {
    //console.log(`useCollegeHooks Actions: ${JSON.stringify(actions)}`);
    const [collegesData, setCollegesData] = useState([]);
    const [mutateResponse, setMutateResponse] = useState();
    const [error, setError] = useState(null);

    const getColleges = () => {
        loadColleges({}, result => {
            if (result?.networkError || result?.graphQLErrors) {
                // setCollegesData({ error: result });
                setError({ error: result });
            } else {
                //console.log(`CollegeManagerHook: ${JSON.stringify(result)}`);
                setCollegesData(result);
            }
        });
    };

    const deleteCollegeById = (id) => {
        removeCollegeById(id, result => {
            if (result?.networkError || result?.graphQLErrors) {
                setError({ error: result });
            } else {
                setMutateResponse(result);
                getColleges();
            }
        });
    };

    const deleteCollegeByIds = (ids) => {
        removeCollegeByIds(ids, result => {
            if (result?.networkError || result?.graphQLErrors) {
                setError({ error: result });
            } else {
                setMutateResponse(result);
                getColleges();
            }
        });
    };

    return [
        collegesData,
        getColleges,
        mutateResponse,
        deleteCollegeById,
        deleteCollegeByIds,
        error
    ];
};