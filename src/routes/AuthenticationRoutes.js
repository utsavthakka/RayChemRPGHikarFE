import React,{useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import SendDocs from "../containers/SendDocs";
import DippingParameters from "../containers/DippingParameters/DippingParameters";
import GlovesTracking from "../containers/GlovesTracking/GlovesTracking";
import Dashboard from "../containers/Dashboard/Dashboard";
import GlovesPairing from "../containers/GlovesPairing/GlovesPairing";
import CubeJsApiWrapper from "../cubejs/CubeJsApiWrapper";
import ReportMain from "../containers/Reports & Approvals/ReportMain";
import Analytics from "../containers/AdvanceAnalytics/Analytics";
import Quality from "../containers/AdvanceAnalytics/Quality";
import CustomerMainReport from "../containers/CustomerReport/CustomerMainReports";
import CertificateofAccorance from "../containers/CustomerReport/Certificate";
import SalesSummary from "../containers/AdvanceAnalytics/SalesMainSummary";
import QualityMain from "../containers/AdvanceAnalytics/QualityMain";
import { VisualPercentageChart } from "../containers/AdvanceAnalytics/VisualPercentageChart";
import { Production } from "../containers/AdvanceAnalytics/Production";
import { SubProduction } from "../containers/AdvanceAnalytics/SubProduction";
import ProductionStatus from "../containers/Dashboard/ProductionStatus";
import AnalyticsStatus from "../containers/Dashboard/AnalyticsStatus";
import CSVReport from "../containers/Dashboard/CSVReport";
import VisualClassWiseChart from "../containers/AdvanceAnalytics/VisualClassWiseChart";
import FinalVisualClassWiseChart from "../containers/AdvanceAnalytics/FinalVisualClassWiseChart";
import {ElectricTestRejectionTable}  from "../containers/AdvanceAnalytics/ElectricTestRejectionTable";
import ElectricClassWiseChart  from "../containers/AdvanceAnalytics/ElectricTestClasswiseyieldTable";
import {ManualDatabase} from "../containers/manualdatabase/ManualDatabase";
import {PackDispatch} from '../containers/Dashboard/PackDispatch';
import { useNavigate } from 'react-router-dom';


const AuthenticationRoutes = () => {

  const navigate = useNavigate();
  const currentPath = window.location.pathname;
 
    const endpoints = [
      '/dashboard',
      '/productionStatus',
      '/PackDispatch',
      '/analyticsStatus',
      '/csv-report',
      '/dipping-parameters',
      '/gloves-tracking',
      '/gloves-pairing',
      '/reports',
      '/analytics',
      '/production',
      '/production/production',
      '/quality-analytics',
      '/sales-summary',
      '/analytics/quality',
      '/percentage-chart',
      '/classwise-chart',
      '/manual-database',
      '/rejection-chart',
      '/finalvisual-chart',
      '/customer-report',
      '/certificate',
      '/electric-test-class-wise-yield'
    ];
    


  useEffect(()=>{
    if (!endpoints.includes(currentPath)) {
      navigate('/dashboard');
    }
    
  },[currentPath,navigate])

  return (
    <CubeJsApiWrapper>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productionStatus" element={<ProductionStatus />} />
        <Route path="/PackDispatch" element={<PackDispatch />} />
        <Route path="/analyticsStatus" element={<AnalyticsStatus />} />
        <Route path="/csv-report" element={<CSVReport />} />
        <Route path="/dipping-parameters" element={<DippingParameters />} />
        <Route path="/gloves-tracking" element={<GlovesTracking />} />
        <Route path="/gloves-pairing" element={<GlovesPairing />} />
        <Route path="/reports" element={<ReportMain />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/production" element={<Production />} />
        <Route path="/production/production" element={<SubProduction />} />
        <Route path="/quality-analytics" element={<QualityMain />} />
        <Route path="/sales-summary" element={<SalesSummary />} />
        <Route path="/analytics/quality" element={<Quality />} />
        <Route path="/percentage-chart" element={<VisualPercentageChart />} />
        <Route path="/classwise-chart" element={<VisualClassWiseChart />} />
        <Route path="/manual-database" element={<ManualDatabase />} />
        <Route
          path="/rejection-chart"
          element={<ElectricTestRejectionTable />}
        />
        <Route
          path="/electric-test-class-wise-yield"
          element={<ElectricClassWiseChart />}
        />
        <Route
          path="/finalvisual-chart"
          element={<FinalVisualClassWiseChart />}
        />
        <Route path="/customer-report" element={<CustomerMainReport />} />
        <Route path="/certificate" element={<CertificateofAccorance />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </CubeJsApiWrapper>
  );
};
export default AuthenticationRoutes;
