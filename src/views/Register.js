import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Animated,
  Keyboard
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Input from "../components/Input";
import Button from "../components/Button";

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fullName: "",
      emailAddress: "",
      password: ""
    }
  }




  onPressCompleteRegister = () => {
    const { fullName, emailAddress, password } = this.state

    const user = {
      username: fullName,
      email: emailAddress,
      password
    }
    fetch("http://192.168.100.32:8000/account/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.message == "User Created") {
          alert(data.message)
          this.props.navigation.navigate("Home");
        }
        else if (data.message == "Mail exists") {
          alert(data.message)
        }
        else {
          alert("Something wnt to wrong")
        }
      })
    }).catch((err) => {
      console.log(err)
    })

  };

  componentWillMount() {
    this.formPosition = new Animated.Value(0);
    this.animatedTitleTopMargin = new Animated.Value(20);
    this.animatedTitleSize = new Animated.Value(70);

    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );

    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardWillShow = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.formPosition, {
        duration: duration,
        toValue: -hp("5.25%")
      }),
      Animated.timing(this.animatedTitleTopMargin, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.animatedTitleSize, {
        duration: duration,
        toValue: 50
      })
    ]).start();
  };

  keyboardWillHide = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.formPosition, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.animatedTitleTopMargin, {
        duration: duration,
        toValue: 20
      }),
      Animated.timing(this.animatedTitleSize, {
        duration: duration,
        toValue: 70
      })
    ]).start();
  };



  handleChange = (key, val) => {
    if (key == "fullName") {
      this.setState({
        fullName: val
      });
    }
    if (key == "emailAddress") {
      this.setState({
        emailAddress: val
      });
    }
    if (key == "password") {
      this.setState({
        password: val
      });
    }
  }


  render() {
    // console.log(this.state.fullName)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F6F6F6"
        }}
      >
        <Animated.View
          style={{
            height: hp("18%"),
            justifyContent: "center",
            paddingHorizontal: hp("2.5%"),
            marginTop: this.animatedTitleTopMargin
            // marginTop: Platform.OS == "android" ? hp("3.75%") : null
          }}
        >
          <Animated.Text
            style={{
              fontSize: this.animatedTitleSize,
              fontWeight: "400",
              // opacity: this.animatedTitleOpacity
              opacity: 1
            }}
          >
            Signup.
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: hp("2.5%"),
            marginBottom: Platform.OS == "android" ? hp("10%") : null,
            marginTop: this.formPosition
          }}
        >
          {/* form */}
          <Input
            handleChange={this.handleChange.bind(this, "fullName")}
            value={this.state.fullName}
            label="Your name"
            placeholder="Enter your Full name" />
          <Input
            handleChange={this.handleChange.bind(this, "emailAddress")}
            value={this.state.emailAddress}
            label="Your email address"
            placeholder="Email address" />
          <Input
            handleChange={this.handleChange.bind(this, "password")}
            value={this.state.password}
            label="Your password"
            placeholder="Password" />

          <Text
            style={{
              fontWeight: "500",
              color: "gray"
            }}
          >
            Or easily{" "}
            <Text
              style={{
                color: "#F08C4F"
              }}
            >
              connect with facebook
            </Text>
          </Text>
        </Animated.View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: hp("2.5%")
          }}
        >
          <ImageBackground
            source={require("../../assets/login_bg_1.jpg")}
            style={{
              flex: 1,
              width: null,
              height: hp("72%")
              // height: Platform.OS == "android" ? 470 : 440
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: hp("5%")
              }}
            >
              <Button
                fullWidth
                onPress={this.onPressCompleteRegister}
                backgroundColor="#F08C4F"
                text="Complete registration"
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default Register;
