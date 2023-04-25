import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import Characters from './components/Characters';
import useFetch from './components/useFetch';

import {
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonInput,
  IonCol,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";

import Cookies from 'universal-cookie';
import jwt from "jwt-decode";
import {useEffect, useState} from "react";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const cookies = new Cookies();

  setupIonicReact();

const [user, setUser]:any = useState(null);

const logout = () => {
  setUser(null);
  cookies.remove("jwt_authorization");
};

const login = (jwt_token : string) => {
  const decoded :any= jwt(jwt_token);

  setUser(decoded);

  cookies.set("jwt_authorization", jwt_token, {expires: new Date(decoded.exp * 1000),});
};

  const {data: characters, isPending, error} = useFetch('https://swapi.dev/api/people/?format=json');

  return (
    
    <div>
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Star Wars JS Client</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            {
              user ? (
                <div>
                  <h1>Welcome {user.first_name}</h1>
                  <button onClick={logout}>Logout</button>
                  {error && <span>{error}</span>}
                  {isPending && <span>Loading...</span>}
                  {characters && <Characters characters={characters} title="hi" />}
                </div>
              ) : (
                <div>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position='floating'>Your user name</IonLabel>
                        <IonInput></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                      <IonLabel position='floating'>Your password</IonLabel>
                        <IonInput type='password'></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" onClick={()=>login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")}>Login</IonButton>
                    </IonCol>
                  </IonRow>
                </div>
            )
          }
        </IonContent>
      </IonApp>
    </div>
    
  );
};

export default App;
