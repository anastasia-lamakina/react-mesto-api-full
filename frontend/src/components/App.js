import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import authApi from "../utils/authApi";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { Register } from "./Register";
import { Login } from "./Login";
import InfoTooltip from "./InfoTooltip";
import { ProtectedRoute } from "./ProtectedRoute";

const App = () => {
  const [editProfileModalData, setEditProfileModalData] = useState(null);
  const [editAvatarModalData, setEditAvatarModalData] = useState(null);
  const [addPlaceModalData, setAddPlaceModalData] = useState(null);
  const [pictureModalData, setPictureModalData] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const [infoTooltipData, setInfoTooltipData] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    _id: null,
    name: null,
    about: null,
    avatar: null,
    email: null,
  });

  const [cards, setCards] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const handleCloseModal = () => {
    setEditProfileModalData(null);
    setEditAvatarModalData(null);
    setAddPlaceModalData(null);
    setPictureModalData(null);
    setConfirmModalData(null);
    setInfoTooltipData(null);
  };

  useEffect(() => {
    api
      .getUserProfile()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser((prev) => ({
          ...prev,
          name,
          about,
          avatar,
          _id,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (location.pathname === "/" && token) {
      authApi
        .getUser(token)
        .then(({ data }) => {
          setCurrentUser({ ...currentUser, email: data.email });
        })
        .catch((err) => console.log(err));
    }
  }, [location]);

  useEffect(() => {
    if (currentUser._id) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser._id]);

  const handleProfileSubmit = (data) => {
    setEditProfileModalData({
      ...editProfileModalData,
      isLoading: true,
    });

    api
      .patchUserInformation(data)
      .then((data) => {
        setCurrentUser((prev) => ({ ...prev, ...data }));
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProfileAvatarSubmit = (data) => {
    setEditAvatarModalData({
      ...editAvatarModalData,
      isLoading: true,
    });

    api
      .patchUserAvatar(data)
      .then((data) => {
        setCurrentUser((prev) => ({ ...prev, ...data }));
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPictureSubmit = (data) => {
    setAddPlaceModalData({
      ...addPlaceModalData,
      isLoading: true,
    });

    api
      .postNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmModalSubmit = () => {
    setConfirmModalData({ ...confirmModalData, isLoading: true });
    api
      .deleteCard(confirmModalData.cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== confirmModalData.cardId));
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLikeClick = async (cardId, isLikedByCurrentUser) => {
    try {
      let data;
      if (isLikedByCurrentUser) {
        data = await api.deleteLikeClick(cardId);
      } else {
        data = await api.putLikeClick(cardId);
      }

      const indexOfCard = cards.findIndex(({ _id: id }) => id === cardId);
      const copyOfCards = [...cards];
      copyOfCards[indexOfCard] = data;
      setCards(copyOfCards);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = (data) => {
    setAuthLoading(true);
    authApi
      .signUp(data)
      .then(() => {
        setInfoTooltipData({ success: true });
        setAuthLoading(false);
      })
      .catch((error) => {
        setInfoTooltipData({ success: false });
        setAuthLoading(false);
        console.log(error);
      });
  };

  const handleLogin = (data) => {
    setAuthLoading(true);
    authApi
      .signIn(data)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setAuthLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setInfoTooltipData({ success: false });
        setAuthLoading(false);
        console.log(error);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <Header />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegisterSubmit={handleRegister}
              isLoading={authLoading}
            />
          </Route>
          <Route path="/sign-in">
            <Login onSignInSubmit={handleLogin} isLoading={authLoading} />
          </Route>
          <ProtectedRoute path="/">
            <Main
              onEditAvatar={setEditAvatarModalData}
              onEditProfile={setEditProfileModalData}
              onAddPlace={setAddPlaceModalData}
              onPlaceDelete={setConfirmModalData}
              onPlacePicture={setPictureModalData}
              onLikeClick={handleLikeClick}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={Boolean(editProfileModalData)}
          isLoading={editProfileModalData?.isLoading}
          onSubmit={handleProfileSubmit}
          onClose={handleCloseModal}
        />
        <EditAvatarPopup
          isOpen={Boolean(editAvatarModalData)}
          isLoading={editAvatarModalData?.isLoading}
          onSubmit={handleProfileAvatarSubmit}
          onClose={handleCloseModal}
        />
        <AddPlacePopup
          isOpen={Boolean(addPlaceModalData)}
          isLoading={addPlaceModalData?.isLoading}
          onSubmit={handleAddPictureSubmit}
          onClose={handleCloseModal}
        />
        <ConfirmPopup
          isOpen={Boolean(confirmModalData)}
          isLoading={confirmModalData?.isLoading}
          onSubmit={handleConfirmModalSubmit}
          onClose={handleCloseModal}
        />
        <ImagePopup
          isOpen={Boolean(pictureModalData)}
          onClose={handleCloseModal}
          name={pictureModalData?.name}
          link={pictureModalData?.link}
        />
        <InfoTooltip
          isOpen={Boolean(infoTooltipData)}
          success={infoTooltipData?.success}
          onClose={handleCloseModal}
        />
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
