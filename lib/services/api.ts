/**
 * Intellect School Website - API Services
 * Type-safe services for database operations
 * Sprint 0 - INT-10: Frontend API Service Layer
 */

import { createClient } from '@/lib/supabase/client'
import type { Database, Tables, TablesInsert, TablesUpdate } from '@/lib/database.types'

type SupabaseClient = ReturnType<typeof createClient>

/**
 * Base service class with common database operations
 */
class BaseService<TableName extends keyof Database['public']['Tables']> {
    protected supabase: SupabaseClient
    protected tableName: TableName

    constructor(tableName: TableName) {
        this.supabase = createClient()
        this.tableName = tableName
    }

    /**
     * Get all records from table
     */
    async getAll(filters?: Record<string, unknown>) {
        let query = this.supabase.from(this.tableName).select('*')

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value as string | number | boolean)
            })
        }

        const { data, error } = await query
        if (error) throw error
        return data as Tables<TableName>[]
    }

    /**
     * Get single record by ID
     */
    async getById(id: string) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data as Tables<TableName>
    }

    /**
     * Create new record
     */
    async create(data: TablesInsert<TableName>) {
        const { data: result, error } = await this.supabase
            .from(this.tableName)
            .insert(data)
            .select()
            .single()

        if (error) throw error
        return result as Tables<TableName>
    }

    /**
     * Update existing record
     */
    async update(id: string, data: TablesUpdate<TableName>) {
        const { data: result, error } = await this.supabase
            .from(this.tableName)
            .update(data)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return result as Tables<TableName>
    }

    /**
     * Delete record
     */
    async delete(id: string) {
        const { error } = await this.supabase
            .from(this.tableName)
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    }
}

/**
 * Documents Service
 */
export class DocumentsService extends BaseService<'documents'> {
    constructor() {
        super('documents')
    }

    async getByCategory(category: string) {
        const { data, error } = await this.supabase
            .from('documents')
            .select('*')
            .eq('category', category)
            .eq('is_archived', false)
            .order('published_at', { ascending: false })

        if (error) throw error
        return data
    }

    async getPublished() {
        const { data, error } = await this.supabase
            .from('documents')
            .select('*')
            .eq('is_archived', false)
            .order('published_at', { ascending: false })

        if (error) throw error
        return data
    }
}

/**
 * News Service
 */
export class NewsService extends BaseService<'news'> {
    constructor() {
        super('news')
    }

    async getPublished(limit?: number) {
        let query = this.supabase
            .from('news')
            .select('*')
            .eq('is_published', true)
            .order('priority', { ascending: false })
            .order('published_at', { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    }

    async getBySlug(slug: string) {
        const { data, error } = await this.supabase
            .from('news')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single()

        if (error) throw error
        return data
    }

    async getByCategory(category: string, limit?: number) {
        let query = this.supabase
            .from('news')
            .select('*')
            .eq('category', category)
            .eq('is_published', true)
            .order('published_at', { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    }
}

/**
 * Departments Service
 */
export class DepartmentsService extends BaseService<'departments'> {
    constructor() {
        super('departments')
    }

    async getActive() {
        const { data, error } = await this.supabase
            .from('departments')
            .select('*')
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async getByType(type: string) {
        const { data, error } = await this.supabase
            .from('departments')
            .select('*')
            .eq('type', type)
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async getWithStaff() {
        const { data, error } = await this.supabase
            .from('departments')
            .select(`
                *,
                staff_members (*)
            `)
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async reorder(items: { id: string; order_index: number }[]) {
        const promises = items.map(item =>
            this.supabase
                .from('departments')
                .update({ order_index: item.order_index })
                .eq('id', item.id)
        )
        await Promise.all(promises)
    }
}

/**
 * Staff Members Service
 */
export class StaffService extends BaseService<'staff_members'> {
    constructor() {
        super('staff_members')
    }

    async getActive() {
        const { data, error } = await this.supabase
            .from('staff_members')
            .select('*')
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async getByDepartment(departmentId: string) {
        const { data, error } = await this.supabase
            .from('staff_members')
            .select('*')
            .eq('department_id', departmentId)
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async getWithDepartment() {
        const { data, error } = await this.supabase
            .from('staff_members')
            .select(`
                *,
                departments (*)
            `)
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async reorder(items: { id: string; order_index: number }[]) {
        const promises = items.map(item =>
            this.supabase
                .from('staff_members')
                .update({ order_index: item.order_index })
                .eq('id', item.id)
        )
        await Promise.all(promises)
    }
}

/**
 * Calendar Events Service
 */
export class CalendarEventsService extends BaseService<'calendar_events'> {
    constructor() {
        super('calendar_events')
    }

    async getUpcoming(limit?: number) {
        const now = new Date().toISOString()
        let query = this.supabase
            .from('calendar_events')
            .select('*')
            .gte('start_date', now)
            .eq('is_published', true)
            .order('start_date', { ascending: true })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    }

    async getByDateRange(startDate: string, endDate: string) {
        const { data, error } = await this.supabase
            .from('calendar_events')
            .select('*')
            .gte('start_date', startDate)
            .lte('end_date', endDate)
            .eq('is_published', true)
            .order('start_date', { ascending: true })

        if (error) throw error
        return data
    }

    async getByType(eventType: string) {
        const { data, error } = await this.supabase
            .from('calendar_events')
            .select('*')
            .eq('event_type', eventType)
            .eq('is_published', true)
            .order('start_date', { ascending: true })

        if (error) throw error
        return data
    }
}

/**
 * Gallery Service
 */
export class GalleryService extends BaseService<'gallery'> {
    constructor() {
        super('gallery')
    }

    async getPublished(limit?: number) {
        let query = this.supabase
            .from('gallery')
            .select('*')
            .eq('is_published', true)
            .order('event_date', { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    }

    async getWithImages(galleryId: string) {
        const { data, error } = await this.supabase
            .from('gallery')
            .select(`
        *,
        gallery_images (*)
      `)
            .eq('id', galleryId)
            .eq('is_published', true)
            .single()

        if (error) throw error
        return data
    }

    async getByCategory(category: string) {
        const { data, error } = await this.supabase
            .from('gallery')
            .select('*')
            .eq('category', category)
            .eq('is_published', true)
            .order('event_date', { ascending: false })

        if (error) throw error
        return data
    }
}

/**
 * Gallery Images Service
 */
export class GalleryImagesService extends BaseService<'gallery_images'> {
    constructor() {
        super('gallery_images')
    }

    async getByGallery(galleryId: string) {
        const { data, error } = await this.supabase
            .from('gallery_images')
            .select('*')
            .eq('gallery_id', galleryId)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    }

    async reorder(items: { id: string; order_index: number }[]) {
        const promises = items.map(item =>
            this.supabase
                .from('gallery_images')
                .update({ order_index: item.order_index })
                .eq('id', item.id)
        )
        await Promise.all(promises)
    }
}

/**
 * Suggestions Service
 */
export class SuggestionsService extends BaseService<'suggestions'> {
    constructor() {
        super('suggestions')
    }

    async submit(data: TablesInsert<'suggestions'>) {
        return this.create(data)
    }

    async getByEmail(email: string) {
        const { data, error } = await this.supabase
            .from('suggestions')
            .select('*')
            .eq('email', email)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    async getByStatus(status: string) {
        const { data, error } = await this.supabase
            .from('suggestions')
            .select('*')
            .eq('status', status)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    async respond(id: string, response: string, respondedBy: string) {
        const { data, error } = await this.supabase
            .from('suggestions')
            .update({
                response,
                responded_by: respondedBy,
                responded_at: new Date().toISOString(),
                status: 'responded',
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}

/**
 * Portal Posts Service
 */
export class PortalPostsService extends BaseService<'portal_posts'> {
    constructor() {
        super('portal_posts')
    }

    async getByPortal(portal: string, limit?: number) {
        let query = this.supabase
            .from('portal_posts')
            .select('*')
            .eq('portal', portal)
            .eq('is_published', true)
            .order('priority', { ascending: false })
            .order('published_at', { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    }

    async getBySlug(slug: string) {
        const { data, error } = await this.supabase
            .from('portal_posts')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single()

        if (error) throw error
        return data
    }

    async getByCategory(portal: string, category: string, limit?: number) {
        let query = this.supabase
            .from('portal_posts')
            .select('*')
            .eq('portal', portal)
            .eq('category', category)
            .eq('is_published', true)
            .order('published_at', { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    }
}

// Export service instances
export const documentsService = new DocumentsService()
export const newsService = new NewsService()
export const departmentsService = new DepartmentsService()
export const staffService = new StaffService()
export const calendarEventsService = new CalendarEventsService()
export const galleryService = new GalleryService()
export const galleryImagesService = new GalleryImagesService()
export const suggestionsService = new SuggestionsService()
export const portalPostsService = new PortalPostsService()
