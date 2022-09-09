import React from "react";
import Card from "./components/Card"
import Header from "./components/Header";
import Drawer from "./components/Drawer";
// import {items} from "./utils/constants";
function App() {

    const [cartOpened, setCartOpened] = React.useState(false);
    const [items, setItems] = React.useState([]);
// back-end
    React.useEffect(() =>
    {
        fetch("https://631ac033fae3df4dcfeb4d15.mockapi.io/items")
            .then((response) =>{
            return response.json();
        })
            .then((json) =>{
                setItems(json);
            });
    }, []);

// корзина
    const [cartItems, setCartItems] = React.useState([]);
 // добавление в корзину
    const onAddToCart = (obj) =>
    {
        setCartItems(prev => [...prev, obj]);
    }
    return (
        <div className="wrapper clear">
            <Header onClickCart={() => setCartOpened(true)}
                    />
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>

                <div className="d-flex flex-wrap">
                    {items.map((item)=>
                    <Card
                        imageUrl={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        onClickFavorite={()=> console.log("Добавили закладки")}
                        onPlus={(obj)=> onAddToCart(obj)}
                    />)}
                </div>

            </div>

        </div>
    );
}

export default App;
