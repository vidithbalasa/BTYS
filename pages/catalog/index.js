import { useEffect, useState, useRef } from 'react';
import globalStyles from '../../styles/global.module.css';
import styles from '../../styles/catalog.module.css';
import { searchClient } from '../../src/config/firebase.config';
import { findResultsState } from 'react-instantsearch-dom/server';
import Search from '../../components/search';

// const createURL = (state) => `?${qs.stringify(state)}`;

export default function Catalog(props) {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
            <Search
                searchClient={searchClient} 
                indexName={'catalog'}
                // resultsState={props.resultsState}
                // createURL={createURL}
            />
        </main>
    )
}

// export async function getServerSideProps({ resolvedUrl }) {
//     const resultsState = await findResultsState(Search, {
//         searchClient,
//         indexName: 'catalog',
//     });

//     return {
//         props: {
//             resultsState: JSON.parse(JSON.stringify(resultsState))
//         }
//     }
// }