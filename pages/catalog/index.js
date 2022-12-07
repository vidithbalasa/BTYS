import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import globalStyles from '../../styles/global.module.css';
import styles from '../../styles/catalog.module.css';
import { searchClient } from '../../src/config/firebase.config';
import { findResultsState } from 'react-instantsearch-dom/server';
import Search from '../../components/search';

const updateAfter = 700;

const createURL = (state) => `?${qs.stringify(state)}`;

const pathToSearchState = (path) =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

const searchStateToURL = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';

export default function Catalog(props) {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
            <Search
                searchClient={searchClient} 
                indexName={'catalog'}
                resultsState={props.resultsState}
                createURL={createURL}
            />
        </main>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    // const searchState = pathToSearchState(resolvedUrl);
    const resultsState = await findResultsState(Search, {
        searchClient,
        indexName: 'catalog',
        // searchState,
    });

    return {
        props: {
            // searchState,
            resultsState: JSON.parse(JSON.stringify(resultsState))
        }
    }
}