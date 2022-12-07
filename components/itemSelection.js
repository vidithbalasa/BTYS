// import styles from '../styles/item.module.css'
import styles from '../styles/itemSelection.module.css'

export default function ItemSelection({ unique, validVariants, selected, selectItem, unselectItem, createMockup }) {

    const isDisabled = (key, value) => {
        // if the key is already in selected, then it's not disabled
        if (Object.keys(selected).length == 1 && selected[key]) {
            return false;
        }
        // if the key is not in selected, then it's disabled if the value is not in validVariants
        else {
            return !validVariants.some(variant => variant[key] === value);
        }
    }

    return (
        <div className={styles.infoBox}>
            <h3>Create a Mockup</h3>
            {/* Map over unique values to create multiple choice input selection for each category but where you click an item not a list */}
            {
                Object.keys(unique).map((key, index) => {
                    return (
                        <div key={index}>
                            <h4>{key}</h4>
                            <div className={styles.selection}>
                                {
                                    unique[key].map((value, index) => {
                                        return (
                                            <div>
                                                {/* styling in globals.css */}
                                                <input 
                                                    type="radio" id={value} 
                                                    name={key} value={value} 
                                                    key={index} checked={selected[key] === value}
                                                    onChange={(e) => selectItem(key, value)}
                                                    onClick={(e) => unselectItem(key)}
                                                    disabled={isDisabled(key, value)}
                                                    className={styles.radio}
                                                />
                                                <label htmlFor={value}>{value}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            <button onClick={createMockup} disabled={true}>Create Mockup</button>
        </div>
    )
}