import React from 'react';

import './Select.css';

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.filePickerRef = React.createRef();
    }
    state = {
        files: [null, null, null],
        position: 0,
        selectedFile: [],
    };

    pickedHandler = (event) => {
        if (
            this.state.position + event.target.files.length <=
            this.props.count
        ) {
            let pickedFile = [];
            if (event.target.files) {
                pickedFile = event.target.files;
                this.setState({
                    selectedFile: event.target.files,
                });
            }

            for (var i = 0; i < pickedFile.length; i = i + 1) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    let url = fileReader.result;
                    let urls = this.state.files;
                    if (this.state.position < this.state.files.length) {
                        urls[this.state.position] = url;
                    } else {
                        urls.push(url);
                    }
                    this.setState({
                        files: urls,
                        position: this.state.position + 1,
                    });
                };
                fileReader.readAsDataURL(pickedFile[i]);
            }
        } else {
            window.alert('Maximum 10 files.');
        }
    };

    pickImageHandler = () => {
        this.filePickerRef.current.click();
    };

    deletePhotoHandler = (f, i) => {
        let abc;
        if (this.state.files) {
            abc = this.state.files.filter(
                (f1, index) => f1 !== f || index !== i
            );
            this.setState({ files: abc, position: this.state.position - 1 });
        }
        if (abc.length < 3) {
            abc.push(null);
            this.setState({ files: abc });
        }
        this.filePickerRef = React.createRef();
    };

    render() {
        return (
            <div>
                <div className="images_square">
                    {this.state.files.map((f, index) => (
                        <div key={index}>
                            <div className="square">
                                <input
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={this.filePickerRef}
                                    accept=".jpg,.png,.jpeg"
                                    onChange={this.pickedHandler}
                                />
                                <div>
                                    <div className="image-upload__preview">
                                        {f && <img src={f} alt="Preview" />}
                                        {!f && <p>Please pick an image.</p>}
                                    </div>
                                    {!f && (
                                        <button onClick={this.pickImageHandler}>
                                            Pick photu
                                        </button>
                                    )}
                                    {f && (
                                        <button
                                            onClick={() =>
                                                this.deletePhotoHandler(
                                                    f,
                                                    index
                                                )
                                            }>
                                            Delete photu
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {this.state.position !== this.props.count && (
                        <div>
                            <button
                                className="add_more_button"
                                onClick={this.pickImageHandler}>
                                Add More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Select;
