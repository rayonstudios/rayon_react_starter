import PageHeading from "@/lib/components/page-heading/page-heading";
import { bgJobsActions } from "@/modules/bg-jobs/slices/bg-jobs.slice";
import { BgJobStatus } from "@/modules/bg-jobs/types/bg-jobs.types";
import { useUserBgJobs } from "@/modules/bg-jobs/hooks/bg-jobs.hooks";
import { Button, Card, Empty, Progress, Space, Tag, Typography } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useIsLoading } from "@/lib/redux/enhancers/status.enhancer";
import { useAppDispatch } from "@/lib/redux/store";
import { formattedDateTime } from "@/lib/utils/dateTime.utils";

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

const statusColorMap: Record<BgJobStatus, string> = {
  pending: "blue",
  "in-progress": "orange",
  success: "green",
  failed: "red",
};

const BgJobsPage = () => {
  const dispatch = useAppDispatch();
  const { jobs, loading: jobsLoading } = useUserBgJobs();
  const isCreatingJob = useIsLoading("bgJobs", "createDemoJobStatus");

  const handleCreateDemoJob = () => {
    dispatch(bgJobsActions.createDemoJob());
  };

  return (
    <div>
      <PageHeading title="Background Jobs Demo" />

      <div className="mb-6">
        <Button
          type="primary"
          icon={<ThunderboltOutlined />}
          onClick={handleCreateDemoJob}
          loading={isCreatingJob}
          size="large"
        >
          Trigger Demo Job
        </Button>
      </div>

      {jobsLoading ? (
        <Card loading />
      ) : jobs.length === 0 ? (
        <Empty
          description="No jobs yet. Click the button above to create a demo job!"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Space direction="vertical" size="middle" className="w-full">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-md transition-shadow"
              size="small"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Title level={5} className="!mb-1">
                      {job.job}
                    </Title>
                    <Text type="secondary" className="text-xs">
                      ID: {job.id}
                    </Text>
                  </div>
                  <Tag color={statusColorMap[job.status]}>{job.status}</Tag>
                </div>

                {job.status === "in-progress" &&
                  job.resultDetails &&
                  "progress" in job.resultDetails && (
                    <div>
                      <Progress
                        percent={job.resultDetails.progress ?? 0}
                        status="active"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                      />
                    </div>
                  )}

                {job.status === "success" &&
                  job.resultDetails &&
                  (() => {
                    const details = job.resultDetails;
                    return (
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <Text strong className="text-green-700">
                          Completed successfully
                        </Text>
                        <div className="mt-2 text-xs text-gray-600">
                          {details.duration && (
                            <div>
                              Duration: {(details.duration / 1000).toFixed(2)}s
                            </div>
                          )}
                          {details.completedAt && (
                            <div>
                              Completed at:{" "}
                              {formattedDateTime(details.completedAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                {job.status === "failed" && job.errorMessage && (
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <Text strong className="text-red-700">
                      Failed
                    </Text>
                    <div className="mt-1 text-xs text-red-600">
                      {job.errorMessage}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 text-xs text-gray-500 border-t pt-2">
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {dayjs(job.createdAt).fromNow()}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {dayjs(job.updatedAt).fromNow()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </Space>
      )}
    </div>
  );
};

export default BgJobsPage;
