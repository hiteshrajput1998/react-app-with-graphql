import { useEffect, useState } from "react"
import { deleteCollegeById2, deleteCollegeByIds2, loadColleges } from "../../api/college-api/CollegeAPI.js";


export const useCollegesRetriver = (actions) => {
    //console.log(`useCollegesRetriver Actions: ${JSON.stringify(actions)}`);
    const [collegesData, setCollegesData] = useState([]);
    const [deleteResponse, setDeleteResponse] = useState();
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
        deleteCollegeById2(id, result => {
            if (result?.networkError || result?.graphQLErrors) {
                setError({ error: result });
            } else {
                getColleges();
                setDeleteResponse(result);
            }
        });
    };

    const deleteCollegeByIds = (ids) => {
        deleteCollegeByIds2(ids, result => {
            if (result?.networkError || result?.graphQLErrors) {
                setError({ error: result });
            } else {
                getColleges();
                setDeleteResponse(result);
            }
        });
    };

    return [
        collegesData,
        getColleges,
        deleteResponse,
        deleteCollegeById,
        deleteCollegeByIds,
        error
    ];
};