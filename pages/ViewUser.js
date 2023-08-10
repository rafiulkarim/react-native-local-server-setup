// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to view single user

import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

// Connction to access the pre-populated user_db.db
const db = openDatabase({ name: 'user_db.db', createFromLocation: 1 });

const ViewUser = () => {
    let [inputUserId, setInputUserId] = useState('');
    let [userData, setUserData] = useState({});

    let searchUser = () => {
        console.log(inputUserId);
        setUserData({});
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM tbl_user where user_id = ?',
                [inputUserId],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        setUserData(results.rows.item(0));
                    } else {
                        alert('No user found');
                    }
                },
            );
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Mytextinput
                        placeholder="Enter User Id"
                        onChangeText={(inputUserId) => setInputUserId(inputUserId)}
                        style={{ padding: 10, color: "black" }}
                    />
                    <Mybutton title="Search User" customClick={searchUser} />
                    <View
                        style={{
                            marginLeft: 35,
                            marginRight: 35,
                            marginTop: 10
                        }}>
                        <Text style={{color: "black"}}>User Id: {userData.user_id}</Text>
                        <Text style={{color: "black"}}>User Name: {userData.user_name}</Text>
                        <Text style={{color: "black"}}>User Contact: {userData.user_contact}</Text>
                        <Text style={{color: "black"}}>User Address: {userData.user_address}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewUser;