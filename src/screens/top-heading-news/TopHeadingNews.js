import React, { useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { toast, ToastContainer } from "react-toastify";
import NewsList from '../../components/news-list-card/NewsList';
import { useNewsManager, useNewsVariable } from '../../hooks/news-manager/NewsManagerHooks';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '85%',
        marginLeft: '10%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const TopHeadingNews = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [newsList, setNewsList] = useState();
    const { news, getNewsHeading } = useNewsManager([]);
    const [country, setCountry] = useState();
    const [lang, setLang] = useState([]);
    const [selectedLang, setSelectedLang] = useState();
    const previousNewsVariable = useNewsVariable({ country, lang: lang[0] });

    async function getNews(value) {
        await getNewsHeading(value);
    }

    useEffect(() => {
        getNews({ country: 'in', lang: 'en' });
    }, []);

    useEffect(() => {
        if (news?.data) {
            setNewsList(news?.data?.getNews?.articles);
        }
        if (news?.networkError) {
            toast.error(t('error.network'));
        }
    }, [news]);

    useEffect(() => {
        console.log('newsCalled');
        if (previousNewsVariable?.country !== country || previousNewsVariable?.lang !== selectedLang?.key) {
            getNews({ country, lang: selectedLang?.key });
        }
    }, [selectedLang]);

    const handleChangeCountry = (e) => {
        setCountry(e.target.value);

        if (e.target.value === 'in') {
            setLang([{ en: 'English' }, { hi: 'Hindi' }]);
        }
        else if (e.target.value === 'fr') {
            setLang([{ fr: 'French' }]);
        }
        else if (e.target.value === 'gb') {
            setLang([{ uk: 'Ukrainian' }]);
        }
        else {
            setLang([]);
        }
    };

    const handleChangeLanguage = (e) => {
        lang.length > 0 && lang.map(item => {
            if (Object.keys(item) == e.target.value.toString()) {
                setSelectedLang({ key: e.target.value.toString(), value: item[e.target.value] });
            }
        });
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: '4%', border: '2px solid lightgray' }}>
                    <Typography variant component="h1" style={{ textShadow: 'blue 1px 0px' }}>Top Heading</Typography>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={country}
                                onChange={handleChangeCountry}
                                label="Country"
                                name="country"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='in'>India</MenuItem>
                                <MenuItem value='fr'>France</MenuItem>
                                <MenuItem value="gb">UK</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl} disabled={lang.length > 0 ? false : true}>
                            <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={selectedLang?.value}
                                onChange={handleChangeLanguage}
                                label="Language"
                                name="language"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    lang && lang.length > 0 &&
                                    lang.map(item => (
                                        <MenuItem value={Object.keys(item).toString()}>{Object.values(item)}</MenuItem>
                                    ))
                                }
                                { /*<MenuItem value='en'>English</MenuItem>
                            <MenuItem value='hi'>Hindi</MenuItem>
                        <MenuItem value='fr'>French</MenuItem> */ }
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid xs={12} container style={{ height: '650px', overflowY: 'auto' }}>
                    {
                        newsList && newsList.length > 0 ? newsList.map((item) => (
                            <NewsList news={item} />
                        )) : <Grid xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><h3>Opps! No data</h3></Grid>
                    }
                </Grid>
            </Grid>
            <ToastContainer autoClose={5000} />
        </div >
    );
};

export default TopHeadingNews;