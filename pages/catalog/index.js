import { useEffect, useState, useRef } from 'react';
import { useRouter, Router } from 'next/router';
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
    const [searchState, setSearchState] = useState(props.searchState);
    const router = useRouter();
    const debouncedSetState = useRef();

    useEffect(() => {
        if (router) {
          router.beforePopState(({ url }) => {
            setSearchState(pathToSearchState(url));
            Router.back();
            return false;
          });
        }
    }, [router]);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
            <Search
                searchClient={searchClient} 
                indexName={'catalog'}
                searchState={searchState}
                resultsState={props.resultsState}
                onSearchStateChange={(nextSearchState) => {
                    clearTimeout(debouncedSetState.current);
            
                    debouncedSetState.current = setTimeout(() => {
                        const href = searchStateToURL(nextSearchState);
            
                        router.push(href, href, { shallow: true });
                    }, updateAfter);
            
                    setSearchState(nextSearchState);
                }}
                createURL={createURL}
            />
        </main>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    const searchState = pathToSearchState(resolvedUrl);
    const resultsState = await findResultsState(Search, {
        searchClient,
        indexName: 'catalog',
        searchState,
    });

    return {
        props: {
            searchState,
            resultsState: JSON.parse(JSON.stringify(resultsState))
        }
    }
}