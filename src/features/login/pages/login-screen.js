import React, { useEffect, useState } from 'react';
import {
    View,
    Button,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    Pressable,
    Modal,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../common/constants/colors';
import { height, sizeScale, variables, width } from '../../../common/constants/const';
import { LoginButton, AccessToken, LoginResult, Profile } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import loginFace from '../service/login';
function LoginScreen(props) {
    const login = props.state.logined;
    const navigation = props.navigation;
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const submit = () => {
        const urlGet = variables.host2 + '/api/v1/memberships/login?_username=' + username + '&_password=' + password;
        fetch(urlGet, { method: 'POST' })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    try {
                        AsyncStorage.removeItem('@userid').then(() => {
                            Promise.all([
                                AsyncStorage.setItem('@roleid', data.data.role),
                                AsyncStorage.setItem('@userid', data.data.id),
                            ])
                                .then(() => {
                                    dispatch({ type: 'login', payload: true });
                                    navigation.navigate({
                                        name: 'HomeApp',
                                        params: { userid: data.data.id },
                                        merge: true,
                                    });
                                })
                                .catch((err) => console.log(err));
                        });
                    } catch (error) {
                        Alert.alert('Thông Báo', 'Lỗi đăng nhập', [{ text: 'Đồng ý' }]);
                    }
                } else {
                    Alert.alert('Thông Báo', 'Tài khoản hoặc mật khẩu sai', [{ text: 'Đồng ý' }]);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} backgroundColor={colors.white} barStyle={'default'} hidden={true} />
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View
                            style={{
                                backgroundColor: colors.white,
                                width: 100,
                                height: 100,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ActivityIndicator size="large" color={colors.indigo} />
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.image}>
                <Image source={require('../../../img/login-img.jpg')} style={{ width: width, height: height / 3 }} />
            </View>
            <View style={styles.login1}>
                <TextInput
                    style={styles.input}
                    placeholder="Tài khoản"
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Mật khẩu"
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity
                    onPress={() => {
                        submit();
                    }}
                >
                    <View style={styles.buttonLogin}>
                        <Text
                            style={{
                                color: colors.white,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            Đăng nhập
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate({
                            name: 'Forgot',
                            merge: true,
                        });
                    }}
                >
                    <View style={styles.buttonLogin}>
                        <Text
                            style={{
                                color: colors.white,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            Quên mật khẩu
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.or}>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 14,
                        }}
                    >
                        --- hoặc ---
                    </Text>
                </View>
            </View>

            <View style={styles.login}>
                <LoginButton
                    onLoginFinished={(error, result) => {
                        if (error) {
                            console.log('login has error: ' + result.error);
                        } else if (result.isCancelled) {
                            console.log('login is cancelled.');
                        } else {
                            AccessToken.getCurrentAccessToken()
                                .then((currentProfile) => {
                                    loginFace(currentProfile, dispatch);
                                })
                                .catch((err) => console.log(err));
                        }
                    }}
                    onLogoutFinished={() => {
                        setModalVisible(!modalVisible);
                        setTimeout(() => {
                            setModalVisible(modalVisible);
                            navigation.navigate({
                                name: 'AccountTab',
                                params: { userid: username },
                                merge: true,
                            });
                        }, 1000);
                        console.log('logout.');
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   padding: 20,
        //   flexDirection: "column"
    },
    image: {
        flex: 1.5,
        // paddingTop: sizeScale(25),
    },
    input: {
        height: 60,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    buttonLogin: {
        height: 50,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        backgroundColor: colors.primary,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: { width: 5, height: 5 },
    },
    or: {
        height: 50,
        width: 200,
        // margin: sizeScale(12),
        // padding: sizeScale(5),
        borderRadius: 10,
        fontSize: 18,
    },
    login1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 5,
        shadowOpacity: 0.6,
        shadowOffset: { width: 5, height: 5 },
    },
    loginGoogle: {
        width: sizeScale(300),
        height: sizeScale(70),
        borderRadius: sizeScale(10),
        backgroundColor: colors.red,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    logoGoogle: {
        paddingLeft: sizeScale(4),
        paddingRight: sizeScale(4),
        borderRadius: sizeScale(10),
        backgroundColor: colors.red,
        height: sizeScale(64),
    },
    loginFacebook: {
        width: sizeScale(300),
        height: sizeScale(70),
        borderRadius: sizeScale(10),
        backgroundColor: colors.blue,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    logoFacebook: {
        paddingLeft: sizeScale(4),
        paddingRight: sizeScale(4),
        borderRadius: sizeScale(10),
        backgroundColor: colors.blue,
        height: sizeScale(64),
    },
    titleLoginGoogle: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default connect((state) => {
    return {
        state: state,
    };
})(LoginScreen);
