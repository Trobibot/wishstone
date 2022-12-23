import React from "react";
import './pageWrapper.css'

interface PageWrapperProps {
  Content: React.ReactElement;
}

export default function PageWrapper({ Content }: PageWrapperProps) {

    return (
      <div className="page-wrapper">

        <div className="page-content">
            { Content }
        </div>

      </div>
    );
  }