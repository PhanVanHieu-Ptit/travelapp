import COLORS from "../const/colors";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    header: {
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        width: '100%',
        height: '10%',
        paddingHorizontal:10,
         elevation: 15,
    },
    searchInputContainer: {
        height: 40,
        width: '95%',
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 10,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,

    },
    categoryListText: {
        flexDirection: 'column',
        fontSize: 16,
        fontWeight: 'bold'
    },
    CardHotel: {
        height: 200,
        width: '97%',
        elevation: 15,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        marginHorizontal: 5,
        marginVertical: 1,
        flexDirection: 'row',
        padding: 10,
    },
    Image: {
        height: '100%',
        width: '90%',
        borderRadius: 15,
        backgroundColor: COLORS.white,
    },
    cardImage: {
        height: '90%',
        width: '35%',
        marginVertical: 8,
    },
    cardText: {
        flex: 1,
        height: '100%',
        // weight: '60%',
        // backgroundColor: COLORS.red,
        flexDirection: 'column'
    },
    saleTag: {
        height: '15%',
        width: '30%',
        backgroundColor: COLORS.lightblue,
        opacity: 0.9,
        position: 'absolute',
        zIndex: 1,
        top: 5,
        left: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetail: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    heartButtonStyle: {
        color: COLORS.red,
        position: 'absolute',
        bottom: 5,
        right: 15,

    },
    ratingTag: {
        height: 25,
        width: 60,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginTop: 5,
    },
    starRating: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    h1: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rowBetween: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'space-between'
    }
}
);

export default style;
