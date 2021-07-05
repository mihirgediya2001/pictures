import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <div>
                <div className="square">
                    <input
                        multiple
                        type="file"
                        style={{ display: 'none' }}
                        ref={this.props.filePickerRef}
                        accept=".jpg,.png,.jpeg"
                        onChange={this.props.pickedHandler}
                    />
                    <div>
                        <div className="image-upload__preview">
                            {<p>Please pick an image.</p>}
                        </div>
                        <button onClick={this.props.pickImageHandler}>
                            Pick photu
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Square;
