import React from "react"

class Commodity extends React.Component{
    constructor(){
        super()
        this.state={
            item_title:"",
            ownerName:"",//目前擁有者的資訊
            owneremail:"",
            owneraddress:"",
            enddate:null, //競標的結束時間
            highestbidder:"",
            discription:"",
            imgurl:""
        }
        this.newauction = this.newauction.bind(this)
    }

    newauction(event){
        const {name, value} = event.target
        if(name === "enddate"){
            var ending = value.split("/")
            this.setState({
                [name]: new Date(ending[0],ending[1],ending[2],ending[3],ending[4])
            })
        } else {
            this.setState({
                [name]: value
            }) 
        }
    }

    render(){
        return (
            <main>
                <form>
                    <p>type in the title if your auction:</p>
                    <input
                        name="item_title"
                        value={this.state.item_title}
                        onChange={this.newauction}
                        placeholder="jump auction of one piece manga!!!"
                    />
                    <br />
                    <p>type in your name:</p>
                    <input 
                        name="ownerName" 
                        value={this.state.ownerName} 
                        onChange={this.newauction} 
                        placeholder="Owner Name" 
                    /> 
                    <br />
                    <p>type in your email(for communication):</p>
                    <input 
                        name="owneremail" 
                        value={this.state.owneremail}
                        onChange={this.newauction} 
                        placeholder="Your email" 
                    /> 
                    <br />
                    <p>type in your address</p>
                    <input
                        name="owneraddress" 
                        value={this.state.owneraddress}
                        onChange={this.newauction} 
                        placeholder="Your address" 
                    /> 
                    <br />
                    <p>set your auction's end date：(this has some problem)</p>
                    <input 
                        name="enddate"
                        value={this.state.enddate}
                        onChange={this.newauction} 
                        placeholder="year/month/date/hour/minutes"
                    />
                    <input type="submit" />
                    <br />
                    <p>please type in the discription of your goods</p>
                    <textarea
                        name="discription"
                        value={this.state.discription}
                        onChange={this.newauction}
                    /> 
                    <br />
                    <p>type in your image's url</p>
                    <label>
                        <input
                            name="imgurl"
                            onChange={this.newauction}
                            checked={this.state.imgurl}
                        /> 
                    </label>
                    <br />

                    <button>Submit</button>
                </form>
                <hr />
                <h2>Entered information:</h2>
                <h3>Your item title:{this.state.item_title}</h3>
                <p>Your name: {this.state.ownerName}</p>
                <p>Your email: {this.state.owneremail}</p>
                <p>Your address: {this.state.owneraddress}</p>
                <p>the end date of this auction:{this.state.enddate}</p>
                <p>Your discription: {this.state.discription}</p>
                <p>your goods' img is at :{this.state.imgurl}</p>
            </main>
        )
    }
}



export default Commodity