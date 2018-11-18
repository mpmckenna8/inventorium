//
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {toggleFilterDisplay, toggleCategoryFilter, toggleCollectionFilter, setFilterStocked} from '../actions/actions.js'


class ItemFilters extends Component {
  toggleFilterVisibility() {
    this.props.dispatch(toggleFilterDisplay())
  }
  filterCategory(e, category) {
    console.log('e =', e.target.value)
    let filterCategory = {
      category: category,
      status: e.target.checked
    }
    this.props.dispatch(toggleCategoryFilter(filterCategory))
    console.log('filterCategory: ', filterCategory)
  }
  filterCollection(e, collection) {

    console.log('need to change chollection thing', collection)
    this.props.dispatch(toggleCollectionFilter({
          collection: collection,
          status: e.target.checked
        }))
  }
  filterStocked(e) {

    console.log('need to filter showing stocked stuff');
    this.props.dispatch( setFilterStocked({type:'stocked', checked: e.target.checked}) )
  }
  filterUnstocked(e) {
    console.log('need to filter unstocked things')
        this.props.dispatch( setFilterStocked({type:'unstocked', checked: e.target.checked}) )


  }
  render() {

    let visibleFilters = this.props.Filters.visible;

    let categories = this.props.Filters.categories;
    let category_filters = this.props.Filters.visibleCategories
    let showCollections = this.props.Filters.showCollections;
    let filterCollections = this.props.Filters.collections;
    let selectedCollections = this.props.Filters.selected_collections;
    let maximize = "+";
    let minimize = "-"
    console.log('show filters: ', visibleFilters)
    return (
      <div>
        <h2 onClick={(e) => {
            //console.log('clicked ', e)
            this.toggleFilterVisibility()
          }
        } >
          Filters { visibleFilters ? minimize : maximize }
        </h2>

        <div
          className={ "itemFilters " + (visibleFilters ? 'visibleFilters' : 'invisibleFilters')}
          >


          <div>
            <h4>Quantities</h4>
            <label>In Stock
              <input
                type="checkbox"
                defaultChecked='true'
                value='notZeroed'
                onChange={e => this.filterStocked(e)} />
            </label>
              <br />
            <label>Out of Stock
              <input
                type="checkbox"
                defaultChecked='true'
                value='zeroed'
                onChange={e => this.filterUnstocked(e)} />
              </label>

            </div>
            <div>
              <h4>Category</h4>
                {
                  categories.map((d,i) => {
                  return (
                    <span key={"blah"+d + i}>
                      <label>{d}</label>
                      <input  type="checkbox"
                          defaultChecked={ category_filters.includes(d) }
                          value={d}
                          onChange={ (e) => {this.filterCategory(e, d) }} />
                      <br />
                    </span>  )
                    })
                  }
            </div>
            {
              showCollections ? (
                <div id="collection_filters">
                  collections
                  <br/>
                  {
                    filterCollections.map((d,i) => {
                      return (
                        <span key={"collfilter" + d + i}>
                          <label>{d}</label>
                          <input
                            type="checkbox"
                            defaultChecked={ selectedCollections.includes(d) }
                            value={d}
                            onChange={(e) => {
                              this.filterCollection(e, d)
                            }}
                            />
                            <br />
                        </span>

                      )
                    })
                  }
                </div>
              ) :
              (<span></span>)
            }


        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {

  return state;
}


export default connect(mapStateToProps)(ItemFilters)
