import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import BackButton from "./BackButton";
import Divider from "./Divider";
import { AndroidSafeArea, COLORS, SIZES } from "../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { getBillerCategoryOperator } from "../hooks/useBbpsApi";

const SelectOperator = ({ data, backButtonText, navigate, onPress }) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [operator, setOperator] = useState({});
  const [loader, setLoader] = useState(false);
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    setFilteredOperators(operator);
  }, [operator]);

  const getOperatorInfo = async () => {
    const response = await getBillerCategoryOperator(data);
    if (response) {
      setOperator(response.biller);
      console.log(response, "fasttag");
    }
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    getOperatorInfo();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce((term) => {
      if (term) {
        setFilteredOperators(
          operator.filter(
            (item) =>
              item.billerAliasName.toLowerCase().includes(term.toLowerCase()) ||
              item.billerName.toLowerCase().includes(term.toLowerCase())
          )
        );
      } else {
        setFilteredOperators(operator);
      }
    }, 500);

    debouncedSearch(searchTerm);
  }, [searchTerm]);

  return (
    <SafeAreaView
      style={{ ...styles.container, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.topNavigation}>
            <BackButton text={backButtonText} />
            <Divider />
          </View>
          <View style={{ marginHorizontal: 16 }}>
            <View style={styles.searchBar}>
              <Image
                source={require("../assets/images/search-icon.png")}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search operator..."
                placeholderTextColor={COLORS.TextGray}
                onChangeText={(text) => setSearchTerm(text)}
              />
            </View>
            <Text style={styles.heading}>All Operators</Text>
            {loader ? (
              <Text>loading...</Text>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={filteredOperators}
                style={{ backgroundColor: COLORS.White, borderRadius: 8 }}
                renderItem={({ item }) => (
                  <View key={item.billerId}>
                    <TouchableOpacity
                      style={styles.operatorItem}
                      onPress={
                        onPress
                          ? onPress
                          : () =>
                              navigation.navigate(navigate, {
                                data: item,
                              })
                      }
                    >
                      <Image
                        source={require("../assets/images/airtel.png")}
                        style={styles.operatorIcon}
                      />
                      <Text style={styles.operatorName}>
                        {item.billerAliasName || item.billerName}
                      </Text>
                    </TouchableOpacity>
                    <Divider />
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
        <Divider color="#DDDDDD" />
      </KeyboardAwareScrollView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginVertical: 10,
          marginTop: 20,
        }}
      >
        <Image source={require("../assets/images/BBPS.png")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  topNavigation: {
    backgroundColor: "#f5f5f5",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.borderRadius,
    padding: 10,
    backgroundColor: COLORS.White,
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TextDark,
    marginBottom: 16,
  },
  operatorsContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  operatorItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.White,
    borderRadius: 8,
    marginTop: 10,
  },
  operatorIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  operatorName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TextDark,
  },
});

export default SelectOperator;
