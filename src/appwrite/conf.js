import conf from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databses;
  bucket; // storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwrieDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImafe,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwrieDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwrieDatabaseId,
        conf.appwriteTableId,
        slug,
      );
      return true; // for successful deletion
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
    return false;
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwrieDatabaseId,
        conf.appwriteTableId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
    return false;
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwrieDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique,
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile:: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile:: error", error);
      return false;
    }
  }

  // very fast , give resource url not actual file
  filePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const dbService = new DatabaseService();

export default dbService;
