import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "@expo/vector-icons/Ionicons";
import Input from "../components/Input";

class CreditCard extends Component {
  constructor() {
    super()
    this.state = {
      expire: "",
      CVVCode: "",
      creditCardNumber: "",
    }
  }

  handleChange = (key, val) => {
    if (key == "expire") {
      this.setState({
        expire: val
      });
    }
    if (key == "CVVCode") {
      this.setState({
        CVVCode: val
      });
    }
    if (key == "creditCardNumber") {
      this.setState({
        creditCardNumber: val
      });
    }
  }

  donePayment() {
    const { expire, CVVCode, creditCardNumber } = this.state;
    // console.log(this.state)
    if (expire !== "" && CVVCode !== "" && creditCardNumber !== "") {
        const pay = {
          expire,
          CVVCode,
          creditCardNumber
        }
      fetch("https://api-for-ecommerce.herokuapp.com/payment/savepayment", {
        method: "POST",
        body: JSON.stringify(pay),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        res.json().then((data) => {
          if(data.message == "Payment successful !"){
            this.props.navigation.navigate("Home")
          }
          else{
            alert("Somethis went to wrong !")
          }
          console.log(data)
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    else {
      alert("Requier all feilds")
    }
  }


  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {/* error message */}
        {/* <View
          style={{
            width: wp("100%"),
            height: wp("15%"),
            backgroundColor: "red",
            paddingHorizontal: 15,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14
            }}
          >
            Oops, Credit card No is required
          </Text>
        </View> */}
        {/* error message */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingBottom: 15
          }}
        >
          <View
            style={{
              paddingTop: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "gray",
                paddingBottom: 10
              }}
            >
              Scan your card
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: "#EFF0F1",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                paddingVertical: 10
              }}
            >
              <View
                style={{
                  marginRight: 15
                }}
              >
                <Icon name="md-camera" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold"
                }}
              >
                Save time and scan your credit card
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <View
              style={{
                flex: 4
              }}
            >
              <Input
                handleChange={this.handleChange.bind(this, "creditCardNumber")}
                value={this.state.creditCardNumber}
                label="Credit Card #No" />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  width: wp("12%"),
                  height: wp("12%")
                }}
              >
                <Image
                  source={require("../../assets/payment/payment_visa.gif")}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "contain"
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end"
            }}
          >
            <Input
              label="Expire"
              handleChange={this.handleChange.bind(this, "expire")}
              value={this.state.expire}
              widthHalf={true} />
            <Input label="CVV-Code"
              handleChange={this.handleChange.bind(this, "CVVCode")}
              value={this.state.CVVCode}
              widthHalf={true} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <View
              style={{
                width: wp("4.3%"),
                height: wp("4.3%"),
                borderWidth: 1,
                borderColor: "gray",
                marginRight: 10
              }}
            />
            <View
              style={{
                flex: 1
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingBottom: 15
                }}
              >
                Agree to our terms & conditions
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "gray"
                }}
              >
                I agree that I have read and accepted our{" "}
                <Text
                  style={{
                    fontSize: 14,
                    color: "#F08C4F"
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("TermsAndConditions")
                  }
                >
                  {/* <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      this.props.navigation.navigate("TermsAndConditions")
                    }
                    style={{
                      color: "#F08C4F"
                    }}
                  > */}
                  terms & conditions
                  {/* </TouchableOpacity>{" "} */}
                </Text>
                for your purchase
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.donePayment.bind(this)}
              style={{
                backgroundColor: "#F08C4F",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                shadowOffset: { width: 1, height: 2 },
                shadowColor: "#000",
                shadowOpacity: 0.4,
                elevation: 4,
                paddingVertical: 10
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white"
                }}
              >
                Finish your order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default CreditCard;
