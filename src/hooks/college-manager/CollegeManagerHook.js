import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { removeCollegeById, removeCollegeByIds, loadColleges, createCollege, updateCollegeInfo, getCollegeInfo } from "../../api/college-api/CollegeAPI.js";


export const useCollegeManager = (actions) => {
    //console.log(`useCollegeHooks Actions: ${JSON.stringify(actions)}`);
    const [collegesData, setCollegesData] = useState([]);
    const { t } = useTranslation();

    const setMutateResult = (result) => {
        if (result?.networkError || result?.graphQLErrors) {

            if (Object.keys(result?.graphQLErrors).length > 0) {
                toast.error(t('error.graphql'));
            }
            if (result?.networkError) {
                toast.error(t('error.network'));
            }
        } else {

            if (result.data?.createCollege)
                toast.success(result.data.createCollege.message)

            if (result.data?.deleteCollege)
                toast.success(result.data.deleteCollege.message)

            if (result.data?.updateCollege)
                toast.success(result.data.updateCollege.message)

            if (result.data?.deleteColleges)
                toast.success(result.data.deleteColleges.message)

            getColleges();
        }
    };

    const setQueryResult = (result) => {
        if (result?.networkError || result?.graphQLErrors) {
            setMutateResult(result);
        } else {
            setCollegesData(result);
        }
    };

    const getColleges = () => {
        loadColleges({}, result => {
            setQueryResult(result);
        });
    };

    const getCollege = (id) => {
        getCollegeInfo({ id }, result => {
            setQueryResult(result);
        });
    };

    const addCollege = async (input) => {
        createCollege(input, result => {
            setMutateResult(result);
        });
    };

    const updateCollege = (id, input) => {
        updateCollegeInfo({ id, input }, result => {
            setMutateResult(result);
        });
    };

    const deleteCollegeById = (id) => {
        removeCollegeById(id, result => {
            setMutateResult(result);
        });
    };

    const deleteCollegeByIds = (ids) => {
        removeCollegeByIds(ids, result => {
            setMutateResult(result);
        });
    };

    return {
        collegesData,
        getColleges,
        getCollege,
        addCollege,
        updateCollege,
        deleteCollegeById,
        deleteCollegeByIds
    };
};