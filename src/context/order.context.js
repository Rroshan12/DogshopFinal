import React, { createContext } from 'react'
import { firestore } from '../firebase/config'

export const OrdersContext = createContext();

export class OrdersContextProvider extends React.Component {

    state = {
        orders: []
    }

    componentDidMount() {

        const prevOrders = this.state.orders;
        firestore.collection('Orders').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevOrders.push({
                        OrderID: change.doc.id,
                        PersonEmail: change.doc.data().Email,
                        PersonName: change.doc.data().Name,
                        Phonenumber: change.doc.data().Phonenumber,
                        DeliveryStatus: change.doc.data().Deliver,
                        ProductID: change.doc.data().ProductId,
                        TotalPrice: change.doc.data().TotalPrice,
                    })
                }
                this.setState({
                    orders: prevOrders
                })
            })
        })

    }
    render() {
        return (
            <OrdersContext.Provider value={{ orders: [...this.state.orders] }}>
                {this.props.children}
            </OrdersContext.Provider>
        )
    }
}