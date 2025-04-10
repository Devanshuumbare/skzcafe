"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">About SKZ Cafe Pro</h1>

      <Card>
        <CardHeader>
          <CardTitle>SKZ Cafe Pro</CardTitle>
          <CardDescription>Modern Cyber Cafe Management System</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            SKZ Cafe Pro is a comprehensive cyber cafe management system designed to streamline operations and enhance
            user experience in internet cafes, gaming centers, and similar establishments.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Version</h3>
              <p>2.3.2</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Released</h3>
              <p>April 2025</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Developer</h3>
              <p>SKZ Technologies</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">License</h3>
              <p>Commercial</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Real-time station monitoring and management</li>
              <li>User and member management system</li>
              <li>Integrated cafeteria and inventory management</li>
              <li>Comprehensive financial tracking and reporting</li>
              <li>Advanced security features and access control</li>
              <li>Customizable interface and settings</li>
              <li>Detailed activity logging and analytics</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Support</h3>
            <p>
              For technical support, please contact our support team at support@skzcafe.com or visit our website at
              www.skzcafe.com.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
