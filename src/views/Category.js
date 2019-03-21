import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Icon from "@expo/vector-icons/Ionicons";
import ItemList from "../components/ItemList";

const CATEGORY = [
  "Dresses",
  "Shoes",
  "Shorts",
  "Skirts",
  "Dresses",
  "Shoes",
  "Shorts",
  "Skirts"
];




// var DRESSES = [
//   {
//     id: 1,
//     imageUri: require("../../assets/dresses/dresses_1.jpg"),
//     name: "Helena",
//     priceOne: 120,
//     priceTwo: "$180"
//   },
//   {
//     id: 2,
//     imageUri: require("../../assets/dresses/dresses_2.jpg"),
//     name: "Marie-Anne short",
//     priceOne: 180,
//     priceTwo: null
//   },
//   {
//     id: 3,
//     imageUri: require("../../assets/dresses/dresses_3.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   },
//   {
//     id: 4,
//     imageUri: require("../../assets/dresses/dresses_4.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   },
//   {
//     id: 5,
//     imageUri: require("../../assets/dresses/dresses_1.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   },
//   {
//     id: 6,
//     imageUri: require("../../assets/dresses/dresses_2.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   }
// ];
// var SHOES = [
//   {
//     id: 1,
//     imageUri: require("../../assets/shoes/shoes_1.jpg"),
//     name: "Helena",
//     priceOne: 120,
//     priceTwo: "$180"
//   },
//   {
//     id: 2,
//     imageUri: require("../../assets/shoes/shoes_2.jpg"),
//     name: "Marie-Anne short",
//     priceOne: 180,
//     priceTwo: null
//   },
//   {
//     id: 3,
//     imageUri: require("../../assets/shoes/shoes_3.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   },
//   {
//     id: 4,
//     imageUri: require("../../assets/shoes/shoes_4.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   },
//   {
//     id: 5,
//     imageUri: require("../../assets/shoes/shoes_1.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   },
//   {
//     id: 6,
//     imageUri: require("../../assets/shoes/shoes_2.jpg"),
//     name: "Betruschka",
//     priceOne: 80,
//     priceTwo: null
//   }
// ];





class Category extends Component {
  state = {
    currentIndex: 0,
    DRESSES: [],
    SHOES: [],
  };

  componentDidMount() {
    const type = this.props.navigation.state.params
    let arr = []
    fetch("https://api-for-ecommerce.herokuapp.com/product/getProduct?category=Dresses", {
      method: "get",
    }).then((res) => {
      res.json().then((data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].category[0] + "s" === type.name) {
            arr.push(data[i])
          }
        }
        this.setState({
          DRESSES: arr,
        })
      })
    }).catch((err) => {
      console.log(err)
    })
  }



  getProduct(item, ind) {
    const type = this.props.navigation.state.params
    let arr = []
    fetch("https://api-for-ecommerce.herokuapp.com/product/getProduct?category=" + item, {
      method: "get",
    }).then((res) => {
      res.json().then((data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].category[0] + "s" === type.name) {
            arr.push(data[i])
          }
        }
        this.setState({
          SHOES: arr,
          currentIndex: ind
        })
      })
    }).catch((err) => {
      console.log(err)
    })
  }



  renderCategory = () => {
    return CATEGORY.map((item, i) => {
      return (
        <Text
          key={i}
          onPress={this.getProduct.bind(this, item, i)}
          style={{
            fontSize: 18,
            color: this.state.currentIndex === i ? "#F08C4F" : "white",
            paddingHorizontal: 10
          }}>
          {item}
        </Text>
      );
    });
  };

  renderItemList_Dress = () => {
    return this.state.DRESSES.map((item, i) => {
      return (
        <ItemList
          onPress={() =>
            this.props.navigation.navigate("Detail", {
              detailName: item.name,
              detailImageUri: { uri: item.imageUrl },
              detailPriceOne: item.price,
              detailPriceTwo: item.priceTwo ? item.priceTwo : null
            })
          }
          // key={item.id}
          key={i}
          imageUri={{ uri: item.imageUrl }}
          name={item.name}
          priceOne={item.price}
          priceTwo={item.priceTwo ? item.priceTwo : null}
        />
      );
    });
  };

  renderItemList_Shoes = () => {
    return this.state.SHOES.map((item, i) => {
      return (
        <ItemList
          onPress={() =>
            this.props.navigation.navigate("Detail", {
              detailName: item.name,
              detailImageUri: { uri: item.imageUrl },
              detailPriceOne: item.price,
              detailPriceTwo: item.priceTwo ? item.priceTwo : null
            })
          }
          // key={item.id}
          key={i}
          imageUri={{ uri: item.imageUrl }}
          name={item.name}
          priceOne={item.price}
          priceTwo={item.priceTwo ? item.priceTwo : null}
        />
      );
    });
  };
  renderItemList_Shorts = () => {
    return this.state.SHOES.map((item, i) => {
      return (
        <ItemList
          onPress={() =>
            this.props.navigation.navigate("Detail", {
              detailName: item.name,
              detailImageUri: { uri: item.imageUrl },
              detailPriceOne: item.price,
              detailPriceTwo: item.priceTwo ? item.priceTwo : null
            })
          }
          // key={item.id}
          key={i}
          imageUri={{ uri: item.imageUrl }}
          name={item.name}
          priceOne={item.price}
          priceTwo={item.priceTwo ? item.priceTwo : null}
        />
      );
    });
  };


  renderItemList = () => {
    if (this.state.currentIndex === 0) {
      return this.renderItemList_Dress();
    } else if (this.state.currentIndex === 1) {
      return this.renderItemList_Shoes();
    } else if (this.state.currentIndex === 2) {
      return this.renderItemList_Shorts();
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {/* headerScrollHorizontal */}
        <View
          style={{
            height: hp("8%"),
            backgroundColor: "#63CBA7",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 4
            }}
          >
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "center"
              }}
              ref={node => (this.scroll = node)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                {this.renderCategory()}
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              onPress={() => {
                this.scroll.scrollTo({ x: wp("80%") });
              }}
              name="ios-arrow-forward"
              size={20}
              color="white"
            />
          </View>
        </View>
        {/* headerScrollHorizontal */}

        {/* itemLists ScrollVertical */}
        <View
          style={{
            flex: 1
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {/* ItemList */}
            {this.renderItemList()}
          </ScrollView>
        </View>
        {/* itemLists ScrollVertical */}
      </View>
    );
  }
}

export default Category;
