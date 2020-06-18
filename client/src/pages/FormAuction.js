import React from "react"

class FormAuction extends React.Component{
    constructor(props){
        super(props)
        this.onSubmit=this.onSubmit.bind(this)
    }

    onSubmit(event) {
        event.preventDefault();
        var Title = this.refs.item_title.value
        var Owner = this.refs.ownerName.value
        var Email = this.refs.owneremail.value
        var Address = this.refs.owneraddress.value
        var Timeitlast = this.refs.lastingtime.value
        var Description = this.refs.description.value
        var ImgUrl = this.refs.imgurl.value
        var Initialprice = this.refs.startingprice.value

        var newitem = {
            title: Title,
            owner: Owner,
            email: Email,
            address: Address,
            timeitlast: Timeitlast,
            description: Description,
            imgUrl: ImgUrl,
            price: Initialprice
        }
        //console.log(newitem)
    
        this.props.addItem(newitem)
        this.refs.form.reset()
      }
      render () {
        return (
          <form ref="form" onSubmit={this.onSubmit} >
            
            <p>type in the title if your auction:</p>
            <input
                type="text"
                ref="item_title"
                placeholder="jump auction of one piece manga!!!"
            />
            <br />
            <p>type in your name:</p>
            <input 
                ref="ownerName" 
                placeholder="Owner Name" 
            /> 
            <br />
            <p>type in your email(for communication):</p>
            <input 
                ref="owneremail"
                placeholder="Your email" 
            /> 
            <br />
            <p>type in your address</p>
            <input
                ref="owneraddress"
                placeholder="Your address"
            />
            <br />
            <p>set how long your auction will hold :</p> 
            <input 
                ref="lastingtime"
                placeholder="2 days"
            />
            <br />
            <p>please type in the description of your goods</p>
            <textarea
                ref="description"
            />
            <br />
            <p>type in your image's url</p>              
            <input
                ref="imgurl"
            />
            <br />
            <p>type in the starting price</p>
            <input
                ref="startingprice"
            />
            <br />
            <button type="submit" class="ui primary button">Add</button>


        </form>
        )
      }
}
export default FormAuction
//輸入時間時是輸入維持多久!!