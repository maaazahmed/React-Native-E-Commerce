import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";

class Address extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
      contry: "",
      state: ""

    }
  }

  handleChange = (key, val) => {
    if (key == "firstName") {
      this.setState({
        firstName: val
      });
    }
    if (key == "lastName") {
      this.setState({
        lastName: val
      });
    }
    if (key == "addressLine1") {
      this.setState({
        addressLine1: val
      });
    }
    if (key == "addressLine2") {
      this.setState({
        addressLine2: val
      });
    }
    if (key == "city") {
      this.setState({
        city: val
      });
    }
    if (key == "postcode") {
      this.setState({
        postcode: val
      });
    }
    if (key == "contry") {
      this.setState({
        contry: val
      });
    }
    if (key == "state") {
      this.setState({
        state: val
      });
    }
  }

  submitOrder() {
    const { firstName, lastName, addressLine1, addressLine2, city, postcode, contry, state } = this.state;

    const order = {
      postcode, contry, state,
      firstName, lastName, city,
      addressLine1, addressLine2,
    }
    if (firstName !== "" && lastName !== "" && addressLine1 !== "" && addressLine2 !== "" && city !== "" && postcode !== "" && contry !== "" && state !== "") {
      fetch("http://192.168.100.198:8000/order/addOrder", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        res.json().then((data) => {
          if (data.message === "Order successfuly submited !") {
            this.props.navigation.navigate("Shipping")
          }
          else {
            alert(data.message)
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    else{
      alert("Requie all feilds")
    }
  }


  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            paddingBottom: 15,
            paddingHorizontal: 15,
            marginTop: 20
          }}
        >
          <KeyboardAwareScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end"
              }}
            >
              <Input
                handleChange={this.handleChange.bind(this, "firstName")}
                value={this.state.firstName}
                label="Your name"
                widthHalf={true} />
              <Input
                handleChange={this.handleChange.bind(this, "lastName")}
                value={this.state.lastName}
                widthHalf={true} />
            </View>
            <Input
              label="Address line"
              handleChange={this.handleChange.bind(this, "addressLine1")}
              value={this.state.addressLine1} />
            <Input
              handleChange={this.handleChange.bind(this, "addressLine2")}
              value={this.state.addressLine2}
              label="Address line 2" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end"
              }}
            >
              <Input
                handleChange={this.handleChange.bind(this, "city")}
                value={this.state.city}
                label="City" widthHalf={true} />
              <Input
                label="Zip"
                handleChange={this.handleChange.bind(this, "postcode")}
                value={this.state.postcode} widthHalf={true} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end"
              }}
            >
              <Input
                handleChange={this.handleChange.bind(this, "state")}
                value={this.state.state}
                label="State" widthHalf={true} />
              <Input
                handleChange={this.handleChange.bind(this, "contry")}
                value={this.state.contry}
                label="Country" widthHalf={true} />
            </View>
          </KeyboardAwareScrollView>
          <Text
            style={{
              color: "gray",
              fontSize: 14,
              paddingBottom: 5
            }}
          >
            Shipping Options
          </Text>
          <Text
            style={{
              color: "#F08C4F",
              fontSize: 14,
              paddingBottom: 5
            }}
          >
            Please ship to another address
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.submitOrder.bind(this)}
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
                Next Step
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Address;
