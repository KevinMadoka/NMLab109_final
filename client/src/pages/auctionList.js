import React from 'react'
import AuctionItem from './auctionItem'

class AuctionList extends React.Component {
    render() {
        //console.log(this.props)
        var items = this.props.items.map((item, index) => {
            return (
                <AuctionItem
                    key={index}
                    index={index}
                    goods_info={item}
                />
            )
        })
        //console.log(items)
        return (
            <div>
                <ul> {items} </ul>
            </div>
        )    
    }
}

export default AuctionList;

