
import { useApolloClient, useQuery } from '@apollo/client';
import { TextField } from '@mui/material';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { isLoading } from '../../store/cache';

const DataTableUi = ({ columns, query, queryName, loadingData = () => { } }) => {

    const [tData, setTData] = useState([]);
    const client = useApolloClient();

    const { loading, data } = useQuery(query, {
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        isLoading(loading);
        loadingData(loading)
    }, [data, loading, loadingData]);

    const searchCacheData = async (e) => {

        if (e.target.value) {
            const { data } = await client.query({
                query: query
            });

            const localData = data[queryName].filter(entry => Object.values(entry).join(' ').toLowerCase().includes(e.target.value)).map((d, i) => {
                return {
                    id: `${i + 1}`,
                    ...d
                };
            });

            setTData(localData)
        }

    }

    let tableData = [

    ];

    if (data) {
        tableData = data[queryName].map((d, i) => {
            return {
                id: `${i + 1}`,
                ...d
            };
        });

    }


    return (
        <>
            <TextField sx={{
                mb: 2
            }} id="standard-basic"
                onChange={searchCacheData}
                label="Search..." fullWidth placeholder='Search' variant="standard" />

            {
                tData.length > 0 ? (<Table columns={columns} dataSource={tData} />) : (<Table columns={columns} dataSource={tableData} />)
            }
        </>
    )
}

export default DataTableUi
