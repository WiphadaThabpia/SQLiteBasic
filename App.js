import { Suspense } from 'react';
import { StyleSheet, Text, View , ActivityIndicator, StatusBar} from 'react-native';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { DATABASE_NAME, initDb } from './src/db/db';
import ExpenseScreen from './src/screens/ExpenseScreen';

export default function App() {
  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor='#0D1117' />
    <Suspense fallback ={<Loading />}>
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDb} 
    useSuspense>
    <ExpenseScreen />
    </SQLiteProvider>
    </Suspense>
    </>
  );
}

function Loading(){
  <View style ={styles.container}>
    <ActivityIndicator size='large' color='#61DAFB'/>
    <Text Style={styles.text }>กำลังโหลดฐานข้อมูล...</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  text:{
    color:'#8B949E', fontSize: 14},
});
