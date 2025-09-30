import React from 'react'
import { Link, Navigate } from "react-router-dom";
import FilterAccordions from "./FilterAccordions";
import FilterPrice from "./PriceFilter";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';




export default function Sidebar() {




  
  return (
            <div className="col-lg-3 col-md-12 col-sm-12 sticky-sidebar filter-options-sidebar">
              <div className="d-md-none">
                <div className="header-filter-options">
                  <span>
                    جستجوی پیشرفته <i className="fad fa-sliders-h"></i>
                  </span>
                  <button className="btn-close-filter-sidebar">
                    <i className="fal fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="dt-sn dt-sn--box mb-3">
                <form action="">
                  <div className="col-12">
                    <div className="section-title text-sm-title title-wide mb-1 no-after-title-wide">
                      <h2>فیلتر محصولات</h2>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="widget-search">
                      <input
                        type="text"
                        name="s"
                        placeholder="نام محصول یا برند مورد نظر را بنویسید..."
                        style={{marginRight:"10px !important"}}
                      />
                      <button className="btn-search-widget">
                        <SearchOutlinedIcon style={{color:"#fff"}} />
                      </button>
                    </div>
                  </div>
                  <div className="col-12 filter-product mb-3">
                    <div className="accordion" id="accordionExample">
                      <FilterAccordions />

                      <FilterPrice />
                    </div>
                  </div>
               
                  <div className="col-12 mb-3">
                    <div className="parent-switcher">
                      <label className="ui-statusswitcher">
                        <input type="checkbox" id="switcher-1" />
                        <span className="ui-statusswitcher-slider">
                          <span className="ui-statusswitcher-slider-toggle"></span>
                        </span>
                      </label>
                      <label className="label-switcher" for="switcher-1">
                        فقط کالاهای موجود
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-info btn-block px-3 py-1" type="submit">
                      فیلتر
                    </button>
                  </div>
                </form>
              </div>
            </div>
  )
}
