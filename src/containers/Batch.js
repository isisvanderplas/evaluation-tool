import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { Link } from 'react-router-dom'


import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';




class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        picture: PropTypes.string,
        evaluation: PropTypes.arrayOf(PropTypes.shape({
          color: PropTypes.string,
          date: PropTypes.string,
          remark: PropTypes.string,
        }))
      }))
    }),
  }

  componentWillMount() {
    const { batch, fetchOneBatch } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    return(
      <div className="Batch">
        <h1>BATCH #{batch.number}</h1>


        <List>
        {batch.students.map((student) =>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src={student.picture} size={50} />
            }
          >
          {student.name} <br />
          {student.evaluation[student.evaluation.length- 1].color}


         </ListItem>
        )}
        </List>

      </div>
    )
  }
}



const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]

  return {
    batch
  }
}

export default connect(mapStateToProps, {fetchOneBatch, push})(Batch)
