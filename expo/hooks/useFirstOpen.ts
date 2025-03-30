import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useFirstOpen(){
    const [ifFirstTime, setIsFirstTime] = React.useState(false);
    const [ifLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function checkFirstTime(){
            try{
                const hasOpened = await AsyncStorage.getItem("hasOpened");

                if(hasOpened == null){
                    setIsFirstTime(true);
                }
                else{
                    setIsFirstTime(false);
                }
            } 
            catch(e){
                console.error("couldn't get info on first time opening",e);
            }
            finally{
                setLoading(false);
            }
        }
        checkFirstTime();
    }, []);
    return {ifFirstTime, ifLoading}
}
