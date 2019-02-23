import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import * as routes from '@navigation/routes'
import { lightGrey, offWhite } from '@global/styles'
import ForgotPasswordScreen from '@auth/screens/ForgotPasswordScreen'
import LoadingScreen from '@auth/screens/LoadingScreen'
import LoginScreen from '@auth/screens/LoginScreen'
import RegisterScreen from '@auth/screens/RegisterScreen'
import TabBarIcon from '@auth/components/TabBarIcon'
import App from '@App'

const AuthTabs = createBottomTabNavigator({
  [routes.LOGIN]: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <TabBarIcon name='login' focused={focused} />
    }
  },
  [routes.REGISTER]: {
    screen: RegisterScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <TabBarIcon name='adduser' focused={focused} />
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: offWhite,
      borderTopWidth: 0,
      paddingBottom: 8
    },
    labelStyle: {
      fontSize: 12,
      color: lightGrey,
      fontFamily: 'OpenSans',
      marginTop: 4
    }
  }
})

const AuthStack = createStackNavigator({
  [routes.AUTH_MAIN]: AuthTabs,
  [routes.FORGOT_PASSWORD]: ForgotPasswordScreen
}, {
  headerMode: 'none'
})

export default createSwitchNavigator({
  [routes.AUTH_LOADING]: LoadingScreen,
  [routes.AUTH]: AuthStack,
  [routes.APP]: App
})
