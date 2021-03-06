import React from 'react'
import {connect} from 'react-redux'

class Input extends React.Component {

    render() {
        return (
            <form action="#" className="bg-light">
                <div className="input-group">
                    <input type="text" placeholder="Type a message"
                           aria-describedby="button-addon2"

                           className="form-control rounded-0 border-0 py-4 bg-light"/>
                    <div className="input-group-append">
                        <button id="button-addon2" type="submit"

                                className="btn btn-link">send
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Input;