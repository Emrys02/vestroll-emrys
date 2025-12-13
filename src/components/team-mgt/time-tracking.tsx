import EmptyState from "@/components/ui/EmptyState";
import { Check, XCircle, Clock, Clock4Icon, Zap, XIcon, ClockIcon, BuildingIcon, ExternalLink, UserIcon, X } from "lucide-react";
import { cn } from "@/utils/classNames";
import { Timesheet, timesheets } from "@/data/team-mgt";
import { currencies } from "@/util/constant";
import { useState } from "react";
import { CheckMarkIcon } from "../../../public/svg";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { createPortal } from "react-dom";

function TeamMgtTimeSheet() {
    const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const handleStatusModal = (show: boolean) => setShowStatusModal(show);

  const getStatusIcon = (status: Timesheet['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-3 h-3 text-[#F5A623]" />;
      case 'Rejected':
        return <XCircle className="w-3 h-3 text-[#FF4D4F]" />;
      case 'Approved':
        return <Check className="w-3 h-3 text-[#52C41A]" />;
    }
  };

  const getStatusClass = (status: Timesheet['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FFF7E6] text-[#F5A623] border-[#F5A623]';
      case 'Rejected':
        return 'bg-[#FFF1F0] text-[#FF4D4F] border-[#FF4D4F]';
      case 'Approved':
        return 'bg-[#F6FFED] text-[#52C41A] border-[#52C41A]';
    }
  };

  const getStatusText = (status: Timesheet['status']) => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Rejected':
        return 'Rejected';
      case 'Approved':
        return 'Approved';
    }
  };

  const TimesheetList = () => {
    return (
        <section>
      <div className="bg-white sm:bg-white p-4 rounded-lg">
        <div className="space-y-4 mb-6">
            <h2 className="text-base font-semibold text-gray-900">
                Timesheet records
            </h2>
        </div>

        {timesheets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="hidden md:table-header-group ltr:text-left rtl:text-right bg-gray-50 rounded-t-lg text-xs font-medium">
                <tr className="*:font-medium *:text-gray-500">
                  <th className="px-3 py-4 whitespace-nowrap">#</th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Employee
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Rate
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Total worked
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Total amount
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Paid in
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">Status</th>
                  <th className="px-3 py-4 whitespace-nowrap">Submitted</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {timesheets.map((timesheet, index) => (
                <tr className="*:text-[#17171C] *:first:font-medium cursor-pointer" key={index} onClick={() => setSelectedTimesheet(timesheet)}>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{index + 1}</td>
                  {/* includes employee name, role, picture */}
                  <td className="hidden md:table-cell px-3 py-4 w-52 md:w-auto">
                    <div className="flex items-center gap-2">
                      <img src={timesheet.profileImage} alt="img" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col">
                        <span className="font-medium">{timesheet.employeeName}</span>
                        <span className="text-xs text-gray-500">{timesheet.employeeRole}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 w-52 md:w-auto">
                    <div className="hidden md:table-cell line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      ${timesheet.rate.toFixed(2)}/hr
                    </div>
                    <div className="md:hidden line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {timesheet.totalWorked.toFixed(2)} hours
                    </div>
                    {/* mobile view */}
                    <small className="text-xs md:hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7F8C9F]">${timesheet.totalAmount.toFixed(2)}</span>
                        <span className="text-[#DCE0E5]">|</span>
                        <p className="flex items-center gap-1">
                          <img src={currencies[0].icon} alt="fiat" className="w-5 h-5" />
                          <span className="text-[#17171C]">{currencies[0].label}</span>
                        </p>
                      </div>
                    </small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    {timesheet.totalWorked.toFixed(2)}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    ${timesheet.totalAmount.toFixed(2)}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    <div className="w-fit flex items-center gap-1 px-2 border bg-[#F5F6F7] rounded-xl">
                        <img src={currencies[0].icon} alt="fiat" className="w-5 h-5" />
                        <span className="text-[#17171C]">{currencies[0].label}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {/* Status */}
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs flex items-center gap-1 border w-fit",
                      getStatusClass(timesheet.status)
                    )}>
                      {getStatusIcon(timesheet.status)}
                      <span className="text-xs">{getStatusText(timesheet.status)}</span>
                    </div>
                    {/* mobile view */}
                    <small className="md:hidden text-xs text-[#414F62]">{timesheet.submittedAt}</small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{timesheet.submittedAt}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No records yet"
            description="Looks like you're yet to receive any timesheet record"
          />
        )}
      </div>
    </section>
    );
  }

  const TimesheetDetails = () => {
    return (
      <section>
        <div className="bg-white sm:bg-white p-4 rounded-lg">
          <div className="space-y-4 mb-6">
            <button onClick={() => setSelectedTimesheet(null)} className="text-gray-500 cursor-pointer">&larr; Back</button>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Timesheet details
              </h2>
              {/* reject & approve btns */}
              <div className="flex items-center gap-2">
                <button
                    className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-primary-500 border border-primary-500 rounded-lg hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setShowStatusModal(true)}
                    disabled={selectedTimesheet?.status === "Approved" || selectedTimesheet?.status === "Rejected"}
                >
                  Reject <XIcon size={16}/>
                </button>
                <button
                    className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setShowStatusModal(true)}
                    disabled={selectedTimesheet?.status === "Approved"}
                >
                  Approve <CheckMarkIcon />
                </button>
              </div>
            </div>

            {selectedTimesheet && (
            <Card className="p-5 md:p-6 rounded-xl bg-white shadow-xs">
                <div className="flex md:flex-row justify-between items-start md:items-center gap-2 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-200 py-3 px-3 rounded-md">
                            <ClockIcon className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm md:text-lg font-semibold text-gray-800">
                                12 hours, 21 minutes
                            </p>
                            <p className="text-xs md:text-sm text-gray-400">
                                14th oct 25 - 25th oct 25
                            </p>
                        </div>
                    </div>
                    <div className="flex-col flex">
                        <span className="text-xs md:text-sm text-gray-600">Status</span>
                        <span
                            className={cn(
                                "text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium",
                                selectedTimesheet?.status === "Approved"
                                    ? "bg-green-50 border border-green-400 text-green-600"
                                    : selectedTimesheet?.status === "Rejected"
                                    ? "bg-red-50 border border-red-400 text-red-600"
                                    : "bg-yellow-50 border border-yellow-400 text-yellow-600"
                                )}
                            >
                            {selectedTimesheet?.status}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex bg-gray-100 py-1 px-1 justify-between text-sm">
                        <p className="text-gray-500">Rate</p>
                        <p className="text-gray-500">Total amount</p>
                    </div>
                    <div className="flex justify-between text-md">
                        <p className="font-medium">{selectedTimesheet?.rate} USD / Hour</p>
                        <p className="font-medium">${selectedTimesheet?.totalAmount} USD</p>
                    </div>

                    <div>
                        <p className="text-gray-500 bg-gray-100 py-1 px-1 text-sm mb-1">Description</p>
                        <p className="text-gray-700 text-md font-bold">
                            Monthly subscription for design and creative tools used for client
                            deliverables.
                        </p>
                    </div>

                    <div className="text-sm">
                        <div>
                            <div className="bg-gray-100 py-1 px-1 flex items-center justify-between">
                                <p className="text-gray-500 ">Attachment</p>
                                <p className="text-gray-500">Submitted on</p>
                            </div>

                            <div className=" mt-2 text-purple-600 cursor-pointer">
                                <div className="justify-between items-center flex">
                                    <span>File_name.pdf</span>
                                    <p className="text-gray-700">{selectedTimesheet?.submittedAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 rounded-xl shadow-xs">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-200 py-3 px-3 rounded-md">
                            <BuildingIcon className="text-purple-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Quikdash</p>
                          <p className="text-sm text-gray-500">Pay as you go</p>
                        </div>
                    </div>
                    <button className="text-purple-600 relative top-3 gap-1 flex items-center text-sm hover:underline">
                        View contract

                        <ExternalLink size={15}/>
                    </button>
                  </div>
                </Card>

                <Card className="p-4 rounded-xl shadow-xs">
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-200 py-3 px-3 rounded-md">
                            <UserIcon className="text-purple-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{selectedTimesheet?.employeeName}</p>
                          <p className="text-sm text-gray-500">{selectedTimesheet?.employeeRole}</p>
                        </div>
                    </div>
                    <button className="text-purple-600 relative top-3  gap-1 flex items-center text-sm hover:underline">
                        View details
                        <ExternalLink size={15}/>
                    </button>
                  </div>
                </Card>
            </div>

            {/* Status modal with createPortal */}
            {showStatusModal && (
              createPortal(
                <StatusModal
                  timesheetStatus={selectedTimesheet?.status || "Pending"}
                  handleStatusModal={handleStatusModal}
                />,
                document.body
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  const StatusModal = ({timesheetStatus, handleStatusModal}: {timesheetStatus: string, handleStatusModal: (show: boolean) => void}) => {
    const [status, setStatus] = useState(timesheetStatus);
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleApprove = () => {
        setStatus("Approved");
        handleStatusModal(false);
    };

    const handleReject = () => {
        if (!reason.trim()) {
            setError("Please provide a reason for rejection.");
            return;
        }
        setStatus("Rejected");
        handleStatusModal(false);
        setReason("");
        setError("");
    };

    const handleClose = () => {
        handleStatusModal(false);
        setReason("");
        setError("");
    };
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 px-3">
          <div className="bg-white w-full max-w-md rounded-2xl p-4 sm:p-6 relative shadow-lg">
            <div
                className="absolute top-1 left-4 text-gray-900 hover:text-gray-700 cursor-pointer"
                onClick={handleClose}
            >
                <span className="text-2xl">
                    &times;
                </span>
            </div>

            <h3 className="text-base text-center relative bottom-3 sm:text-lg font-semibold mb-4">Reject Timesheet</h3>

            <textarea
              className="w-full mt-4 outline-none border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Enter reason for rejection..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
            ></textarea>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
            )}

            <Button
              onClick={handleReject}
              className="w-full mt-5 bg-purple-800 text-white hover:bg-red-700 text-sm sm:text-base"
            >
              Reject
            </Button>
          </div>
        </div>
    );
  };

  return (
    <>
      {selectedTimesheet ? <TimesheetDetails /> : <TimesheetList />}
    </>
  );
}

export default TeamMgtTimeSheet;
